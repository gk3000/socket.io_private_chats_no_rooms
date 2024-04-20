import React, { useEffect, useState } from 'react';

export default function ChatList({ socket, selectedUser }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const handleMessage = (msg) => {
      // Determine the key under which to store the message
      const messageKey = msg.from === socket.id ? msg.to : msg.from;
      setMessages((currentMessages) => {
        const updatedMessages = { ...currentMessages };
        
        // Determine the type based on the message sender and the socket ID
        const type = msg.from === socket.id ? 'to' : 'from';

        if (!updatedMessages[messageKey]) {
          updatedMessages[messageKey] = [];
        }

        updatedMessages[messageKey].push({ message: msg.message, type });
        return updatedMessages;
      });
    };

    socket.on('chat message', handleMessage);

    // Cleanup: remove event listener when the component unmounts
    return () => {
      socket.off('chat message', handleMessage);
    };
  }, [socket, selectedUser]); // Ensures effect runs only when socket or selectedUser changes

  const renderSelectedUserChats = () => {
    if (messages[selectedUser]) {
      return messages[selectedUser].map((msg, idx) => {
        return <div key={idx}>{msg.type === 'from' ? 'From: ' : 'To: '}{msg.message}</div>;
      });
    }
    return null;
  };

  return <div>{renderSelectedUserChats()}</div>;
}
