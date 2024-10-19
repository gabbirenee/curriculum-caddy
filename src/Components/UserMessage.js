import React from 'react';

function UserMessage ({text}) {
  return (
    <div className='chat-message-user' >
      <p>{text}</p>
    </div>
  );
}

export default UserMessage;