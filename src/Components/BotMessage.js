import React from 'react';

function BotMessage ({text}) {
  return (
    <div className='chat-message-bot'>
      {text}
    </div>
  );
}

export default BotMessage;