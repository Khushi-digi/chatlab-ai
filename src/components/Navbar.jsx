import React from 'react'

const Navbar = () => {
    const handleChat=()=>{
        () => setChatHistory([])
    }
  return (
    <div className='flex justify-around items-center navbar border-[1px] border-zinc-600 rounded-lg'>
        <h1 className="text-3xl font-bold uppercase">ChatLab</h1>
        <button className='px-4 py-1 font-semibold text-white rounded-lg'><a href='https://gemini.google.com/app'>explore</a></button>
      </div>
  )
}

export default Navbar