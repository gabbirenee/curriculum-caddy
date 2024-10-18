import React from 'react';

class UserMessage extends React.Component {
  render() {
    return (
      <div className='chat-message-user' >
        <p>{this.props.text}</p>
      </div>
    );
  };
}

export default UserMessage;