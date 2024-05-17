import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';

function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // New state variable to manage "New Chat" functionality
  const [isNewChat, setIsNewChat] = useState(true); // Start with a new chat

  useEffect(() => {
    // Clear chat history when isNewChat is true
    if (isNewChat) {
      setChatHistory([]);
      setIsNewChat(false); // Reset flag after clearing
    }
  }, [isNewChat]); // Dependency on isNewChat

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (!userInput) return;
    setChatHistory([
      ...chatHistory,
      { message: userInput, isUser: true },
    ]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyBgdoAD3fNeFNpALe0-e82YYLKiv-BfRpY`,
        method: 'post',
        data: {
          contents: [
            { parts: [{ text: `answer in short. ${userInput}` }] },
          ],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;

      setChatHistory([
        ...chatHistory,
        { message: userInput, isUser: true },
        { message: aiResponse, isUser: false },
      ]);
      setUserInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setChatHistory([...chatHistory, { message: 'Something went wrong. Try again later.', isUser: false }]);
    }
  };

  const handleNewChat = () => {
    // Reset chat history and user input when "New Chat" is clicked
    setIsNewChat(true);
    setUserInput('');
  };

  return (
    <div className="flex justify-between flex-col h-[80%] w-[90%] overflow-y-auto bg-zinc-800 p-4 border-[1px] border-zinc-600 rounded-lg m-5 ">
    {
    (chatHistory.length==0)?<p className=' mt-[50%] text-center text-zinc-600 text-xl'>Ask me Anything!</p>:    (<ul className="chat-list flex-grow flex flex-col overflow-y-auto items">
        {chatHistory.map((message, index) => (
          <ChatMessage key={index} message={message.message} isUser={message.isUser} />
        ))}
      </ul>)
    }


      <div className="chat-input flex items-center mt-4">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          className="input-box flex-grow p-2 text-white rounded-lg border border-gray-400 focus:outline-none bg-zinc-700"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="ml-2 text-white py-2 px-4 rounded-lg">
          Send
        </button>
        {/* <button onClick={handleNewChat} className="ml-2 text-white py-2 px-4 rounded-lg">
          <img src='https://icons8.com/icon/54313/reboot' alt='new' className=" h-5 bg-blend-screen"/>
        </button> */}
      </div>
    </div>
  );
}

export default ChatBot;
