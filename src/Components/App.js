import React from 'react';
import '../App.css';
import Conversation from './Conversation.js';
import Settings from './Settings.js'; 

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <p>My App</p>
        <Conversation />
        <Settings />
      </div>
    );
  };
}

export default App;