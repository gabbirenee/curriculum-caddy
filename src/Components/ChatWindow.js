import React, { useState, useRef, useEffect } from 'react';
import BotMessage from './BotMessage.js';
import UserMessage from './UserMessage.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../Styles/Conversation.css';

function ChatWindow() {
  // where the actual conversation text will be stored
  const [messages, setMessages] = useState([
    { sender: 'Gemini', text: 'Welcome to the chat!' },
  ]);

  // tracking the input of the user
  const [input, setInput] = useState('');

  // Ref to indicate bottom of chat window
  const chatEndRef = useRef(null);

  // Scroll to bottom whenever messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // function that returns the initial prompt; planning to allow the teachers to input additional information so this function will become more dynamic in the future
  const initialPrompt = () => {
    var prompt = "I am a middle school computer science student. You are my tutor. Do not generate any responses that are not appropriate for middle school students or not related to the topic of computer science. If I try to ask a question about something not directly related to computer science or something innappropriate, redirect me and have me write another question."
    return prompt
  }

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // When the User Clicks Send
  const handleSend = () => {
    if (input.trim()) { // if there is actual input in the field
      setMessages([...messages, { sender: 'User', text: input }]);   // update the state to include the messages
      setInput(''); // reset the input
    }
  };

  // this is passed down as a prop to the UserMessage component and is called when the component mounts.
  // Gemini API
  const botResponse = async (prompt) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // get all the messages that have been sent so far so that Gemini knows the conversation history
      var convo = [...messages]
      convo.pop()
      convo = JSON.stringify(convo)

      var initial_prompt = initialPrompt()  // get initial prompt

      prompt = initial_prompt + '\nThis is our conversation history: ' + convo + '. \nMy next prompt is: ' + prompt
      console.log(prompt)
      var result = await model.generateContent(prompt);
      var response = result.response;
      var text = response.text();      
      setMessages([...messages, { sender: 'Gemini', text: text }]);
    }
    catch(error) {
      console.log(error)
      setMessages([...messages, { sender: 'Gemini', text: "I'm having some issues getting you an answer. Please try again later!" }]);
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
              <UserMessage text={message.text} botResponse={botResponse} />   // generate the User message component if it is a user message
            ) : (
              <BotMessage text={message.text} />  // generate the bot message if it is a bot message
            )}
          </div>
        ))}
        {/* This empty div is the chat end reference point */}
        <div ref={chatEndRef} />
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
        {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
        <button onClick={handleSend} className="send-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="36" viewBox="0 0 512 512">
            <path className='airplane' d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;