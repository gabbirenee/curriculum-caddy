import React from 'react';
import ToolBar from './ToolBar.js';
import ChatWindow from './ChatWindow.js';

function Conversation () {
  return (
    <div className="Conversation">
      <p>Conversation</p>
      <ToolBar />
      <ChatWindow />
    </div>
  );
}

export default Conversation;