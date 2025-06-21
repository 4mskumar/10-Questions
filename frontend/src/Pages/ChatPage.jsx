import React, { useState } from 'react';
import ChatPageNav from '../components/ChatPageNav';
import ChatHero from '../components/ChatHero';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ChatPage = () => {


  return (
    <div className="bg-zinc-800 w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 py-4">
      <div className="max-w-7xl mx-auto">
        <ChatPageNav />
        <ChatHero />
      </div>
    </div>
  );
};

export default ChatPage;
