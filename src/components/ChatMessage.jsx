import React from 'react';

function ChatMessage({ message, isUser }) {
  const messageStyle = ` transition-all ease-in-out  w-[fit-content] text-left px-4 m-3 py-2 rounded-lg ${isUser ? `user bg-zinc-700 self-end text-right text-white` : `ai items-start bg-gray-200 text-gray-800`}`;
 
  return (
    <li className={messageStyle}>
      {message}
    </li>
  );
}

export default ChatMessage;