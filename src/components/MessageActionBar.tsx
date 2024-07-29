import EmojiPicker from 'emoji-picker-react';
import React, { useCallback, useContext, useState } from 'react';
import ChatContext from '../store/ChatContext';
import { sendTextMessage, sendImageMessage } from '../services/firebase';
import UserContext from '../store/UserContext';
import Image from 'next/image';

type MessageActionBarProps = {
  emojiPicker: boolean;
  setEmojiPicker: React.Dispatch<React.SetStateAction<boolean>>;
};

const MessageActionBar = ({ emojiPicker, setEmojiPicker }: MessageActionBarProps) => {

  const [text, setText] = useState('');
  const { selectedUser } = useContext(ChatContext);
  const [fileUploading, setFileUploading] = useState(false);
  const { user } = useContext(UserContext);

  const closeEmojiPicker = useCallback(() => {
    setEmojiPicker(false);
  }, [setEmojiPicker]);

  const onTextMessageSend = useCallback(async (text: string) => {
    if (!text) return;
    if (!selectedUser || !user) return;

    sendTextMessage(text, user, selectedUser);
  }, [selectedUser, user]);

  const onImageInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    closeEmojiPicker();

    if (!selectedUser || !user) return;
    if (!e.target.files || e.target.files.length === 0) return;

    setFileUploading(true);
    const file = e.target.files[0];
    try {
      await sendImageMessage(file, user, selectedUser)
      setFileUploading(false);
    } catch (error) {
      console.error(error);
      setFileUploading(false);
    }
  }, [selectedUser, user, closeEmojiPicker]);

  return (
    <div className="flex flex-row gap-2 p-2 w-full">
      <input
        disabled={!selectedUser}
        type="text"
        className="input input-ghost input-bordered rounded-none flex-grow"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={closeEmojiPicker}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            closeEmojiPicker();
            onTextMessageSend(text);
            setText('');
          }
        }}
      />
      <div className="relative">
        <button disabled={!selectedUser || fileUploading} className="btn text-2xl" onClick={() => setEmojiPicker(curr => !curr)}>
          😊
        </button>
        {
          emojiPicker && (
            <div className="absolute bottom-16 right-0">
              <EmojiPicker onEmojiClick={(emoji) => setText(currText => currText + emoji.emoji)} />
            </div>
          )
        }
      </div>
      <button className="btn relative" disabled={!selectedUser || fileUploading}>
        {
          fileUploading ? <span className="loading loading-spinner loading-sm" /> :
            <Image src="/image_icon.png" alt="image" width={20} height={20} />
        }
        <input
          type="file"
          accept="image/*"
          className="absolute w-full h-full opacity-0"
          onChange={onImageInput}
        />
      </button>
      <button className="btn btn-primary"
        disabled={!selectedUser || !text || fileUploading}
        onClick={() => {
          closeEmojiPicker();
          onTextMessageSend(text);
          setText('');
        }}>Send</button>
    </div>
  );
};

export default MessageActionBar;