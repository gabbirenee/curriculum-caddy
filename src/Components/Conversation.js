import React from 'react';
import ToolBar from './ToolBar.js';
import ChatWindow from './ChatWindow.js';

function Conversation () {
  return (
    <div className="conversation">
      <ToolBar />
      <ChatWindow />
    </div>
  );
}

export default Conversation;