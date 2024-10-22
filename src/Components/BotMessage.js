import React from 'react';
import ReactMarkdown from 'react-markdown';

function BotMessage ({text}) {
  return (
    <div className='chat-message-bot'>
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default BotMessage;