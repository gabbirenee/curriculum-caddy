import React from 'react';

class BotMessage extends React.Component {
  render() {
    return (
      <div className='chat-message-bot'>
        {this.props.text}
      </div>
    );
  };
}

export default BotMessage;