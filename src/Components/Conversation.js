import React from 'react';
import '../App.css';
import ToolBar from './ToolBar.js';
import ChatWindow from './ChatWindow.js';

class Conversation extends React.Component {
  render() {
    return (
      <div className="Conversation">
        <p>Conversation</p>
        <ToolBar />
        <ChatWindow />
      </div>
    );
  };
}

export default Conversation;