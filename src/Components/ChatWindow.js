// THIS FILE WAS BASED OFF OF CODE GENERATED BY CHATGPT
// THIS FILE WAS BASED OFF OF CODE GENERATED BY CHATGPT
// THIS FILE WAS BASED OFF OF CODE GENERATED BY CHATGPT

import React, {useState} from 'react';
import BotMessage from './BotMessage.js';
import UserMessage from './UserMessage.js';
import '../Styles/Chat.css';

const ChatWindow = () => {
  // where the actual conversation text will be stoed
  const [messages, setMessages] = useState([
    { sender: 'Bot', text: 'Welcome to the chat!' },
  ]);

  // tracking the input of the user
  const [input, setInput] = useState('');

  // When the User Clicks Send
  const handleSend = () => {
    if (input.trim()) { // if there is actual input in the field
      setMessages([...messages, { sender: 'User', text: input }, { sender: 'Bot', text: 'Bot Message!' }]);   // update the state to include the messages
      setInput(''); // reset the input
    }
  };

  // when 'enter' is pressed, do the same thing that you would when the submit button is clicked
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend(event);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((message, index) => ( // generate the messages by looping through the state
          <div key={index} >
            {message.sender === 'User' ? (
              <UserMessage text={message.text} />   // generate the User message component if it is a user message
            ) : (
              <BotMessage text={message.text} />  // generate the bot message if it is a bot message
            )}
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
}

export default ChatWindow;