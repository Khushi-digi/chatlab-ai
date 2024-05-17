import React from 'react';
import ChatBot from './components/ChatBot';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="container bg-zinc-900 p-3 h-screen w-screen flex flex-col items-center justify-center">
    <Navbar/>
      <ChatBot/>
    </div>
  );
}

export default App;