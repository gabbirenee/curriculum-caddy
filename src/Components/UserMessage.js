import React, {useEffect} from 'react';

function UserMessage ({text, botResponse}) {
  useEffect(() => {
    console.log('component did mount')
    botResponse(text)
  }, []);

  return (
    <div className='chat-message-user' >
      <p>{text}</p>
    </div>
  );
}

export default UserMessage;