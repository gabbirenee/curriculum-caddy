import React from 'react';
import '../Styles/App.css';
import Conversation from './Conversation.js';
import Settings from './Settings.js'; 

function App () {
  return (
    <div className="App">
      <Conversation />
      <Settings />
    </div>
  );
}

export default App;