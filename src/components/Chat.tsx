import { useLayoutEffect, useRef } from 'react';
import UserList from './UserList';
import Messages from './Messages';

const Chat = () => {

  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {

    const setChatBoxHeight = () => {

      if (containerRef.current) {
        // set height of container to remaining space from its offset
        const container = containerRef.current;
        const containerHeight = window.innerHeight - container.offsetTop - 20;
        container.style.height = `${containerHeight}px`;
      }
    };

    setChatBoxHeight();
    window.addEventListener('resize', setChatBoxHeight);

    return () => {
      window.removeEventListener('resize', setChatBoxHeight);
    };
  }, [containerRef]);

  return (
    <div ref={containerRef} className="flex border-gray-400 border border-solid rounded-md h-full max-h-full relative">
      <UserList />
      <Messages />
    </div>
  );
};

export default Chat;