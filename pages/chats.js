import React, { useState, useEffect, useContext } from 'react';

import { Context } from '../context';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const ChatEngine = dynamic(() =>
  import('react-chat-engine').then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import('react-chat-engine').then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== undefined) {
      setShowChat(true);
    }
  }, []);

  useEffect(() => {
    if (username === '' || secret === '') {
      router.push('/');
    }
  }, [username, secret]);

  if (!showChat) return <div />;

  return (
    <div className='background'>
      <div className='shadow'>
        <ChatEngine
          height='calc(100vh - 212px)'
          projectID='249a4d7e-e61e-4ea2-afbe-a619c0cbdb5a'
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
