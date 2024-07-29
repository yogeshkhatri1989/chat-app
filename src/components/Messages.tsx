import { useContext, useLayoutEffect, useRef, useState } from "react";
import ChatContext from "../store/ChatContext";
import UserContext from "../store/UserContext";
import Image from "next/image";
import ImageModal from "./ImageModal";
import useChatMessages from "../services/useChatMessages";
import MessageActionBar from "./MessageActionBar";

const Messages = () => {
  const { selectedUser } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [imageModal, setImageModal] = useState<string | null>(null);
  const [emojiPicker, setEmojiPicker] = useState(false);

  const { messages, loading } = useChatMessages(user, selectedUser);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages]);

  return (
    <div className="flex flex-col w-2/3 h-full overflow-auto">
      <div className="bg-base-300 min-h-16 text-2xl flex place-items-center justify-center">
        Messages
      </div>
      <hr />
      <div className="flex flex-grow flex-col-reverse py-4 px-2 overflow-auto" onClick={() => setEmojiPicker(false)}>
        <div ref={messagesEndRef} />
        {
          loading && <div className="flex justify-center"><span className="loading loading-spinner loading-lg" /></div>
        }
        {
          messages.map((message, index) => (
            <div key={index} className={`chat ${message.from === user ? 'chat-end' : 'chat-start'}`}>
              <div className={!message.image ? "chat-bubble chat-bubble-primary" : "chat-bubble bg-transparent"}>
                {message.image ?
                  <Image src={message.image} alt="image" width={200} height={200} onClick={() => setImageModal(message.image!)} /> :
                  message.text}
              </div>
              <div className="chat-footer opacity-50">
                {new Date(message.timestamp).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                })}
              </div>
            </div>
          ))
        }
      </div>
      <MessageActionBar emojiPicker={emojiPicker} setEmojiPicker={setEmojiPicker} />
      {
        imageModal && (
          <ImageModal image={imageModal} onClose={() => setImageModal(null)} open={true} />
        )
      }
    </div>
  );
};

export default Messages;