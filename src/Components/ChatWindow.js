import React from 'react';
import '../App.css';
import BotMessage from './BotMessage.js';
import UserMessage from './UserMessage.js';

class ChatWindow extends React.Component {
  render() {
    return (
      <div className="ChatWindow">
        <p>Chat Window</p>
        <BotMessage />
        <UserMessage />
      </div>
    );
  };
}

export default ChatWindow;