import React, { useState, useRef, useEffect } from 'react';
import BotMessage from './BotMessage.js';
import UserMessage from './UserMessage.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import '../Styles/Conversation.css';

function ChatWindow({prog_lang, grade_level, subject, student_name}) {
  // generative AI model that will be used
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // where the actual conversation text will be stored
  const [messages, setMessages] = useState([
    { sender: 'Ada', text: "Hi! I'm Ada, your Curriculum Caddy. What can I help you with?" },
  ]);

  // tracking the input of the user
  const [input, setInput] = useState('');

  // indicates that the bot response is being worked on
  const [isLoading, setIsLoading] = useState(false);

  // // the programming language that will be used in bot responses
  // const [prog_lang, setProgLang] = useState('python');

  // Ref to indicate bottom of chat window
  const chatEndRef = useRef(null);

  // Ref for chat window in general
  const chatWindowRef = useRef(null);

  // Scroll to bottom whenever messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // function that returns the initial prompt; planning to allow the teachers to input additional information so this function will become more dynamic in the future
  const initialPrompt = () => {
    var prompt = `I am a ${grade_level} ${subject} student named ${student_name}. You are my tutor named Ada. To help them understand the concepts, give the student explanations, examples, and analogies at a level that are appropriate for ${grade_level} students only as needed. You should guide the students to their answers in an open-ended way. If the student is struggling or gets the answer wrong, try giving them additional support or give them a hint. If the student improves, then praise them and show excitement. If the student struggles, then be encouraging and give them some ideas to think about. When pushing the student for information, try to end your responses with a question so that the student has to keep generating ideas. Walk through example problems with the student to help them gain understanding of the topic. Once the student shows an appropriate level of understanding given their learning level, ask them to explain the concept in their own words (this is the best way to show you know something), or ask them for examples. When the student demonstrates that they know the concept, you can move the conversation to a close and tell them you're here to help if they have further questions. Do not generate any responses that are not appropriate for ${grade_level} students or not related to the topic of ${subject}. Don't give me exact answers if helping with a homework problem. If I try to ask a question about something not directly related to ${subject} or something inappropriate, redirect me and have me write another question. Render code snippets/pseudocode in ${prog_lang} unless otherwise directed. If I ask to move on, feel free to do so.`
    return prompt
  }

  const summarize = async (convo) => {
    var sum_prompt = `Write a short summary of our conversation so far: ${convo}.`

    var result = await model.generateContent(sum_prompt);
    var response = result.response;
    var text = response.text();  
    return text
  }

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helps with dynamic text area input
  const adjustChatWindowHeight = (inputHeight) => {
    if (chatWindowRef.current) {
      chatWindowRef.current.style.maxHeight = `calc(100vh - ${inputHeight + 80}px)`; // adjust 80px as needed for padding/margins
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
      setIsLoading(true);

      var initial_prompt = initialPrompt(); // get initial prompt
      var recency_ind = 8
      // get all the messages that have been sent so far so that Gemini knows the conversation history
      var convo = [...messages];
      convo.pop();

      if (convo.length > recency_ind) {
        var to_send = JSON.stringify(convo.slice(-recency_ind))
        var to_summarize = JSON.stringify(convo.slice(convo.length-recency_ind))
        console.log(`to_send: ${to_send}`)
        console.log(`to_summarize: ${to_summarize}`)
        var summary = await summarize(to_summarize) // summarize conversation history
        console.log(summary)
        prompt = `${initial_prompt}\nThis is a summary of our conversation so far: ${summary}\nHere are the last ${recency_ind} messages: ${to_send}\nMy next prompt is: ${prompt}`  // put all the pieces Gemini needs together
        console.log(prompt)
      } else {
        convo = JSON.stringify(convo)
        prompt = `${initial_prompt}\nHere is our conversation up until this point: ${convo}\nMy next prompt is: ${prompt}`  // put all the pieces Gemini needs together
        console.log(prompt)
      }
      var result = await model.generateContent(prompt);
      var response = result.response;
      var text = response.text();  
      console.log(text)
      setIsLoading(false);    
      setMessages([...messages, { sender: 'Ada', text: text }]);
    }
    catch(error) {
      console.log(error)
      setIsLoading(false);
      setMessages([...messages, { sender: 'Ada', text: "I'm having some issues getting you an answer. Please try again later!" }]);
    }
  };

  // when 'enter' is pressed, do the same thing that you would when the submit button is clicked
  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey) {
      e.preventDefault();
      var inp = input;
      inp = `${inp}\n`;
      setInput(inp);
    }
    else if (e.key === 'Enter') {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-content">
        <div className="chat-window" ref={chatWindowRef}>
          {messages.map((message, index) => ( // generate the messages by looping through the state
            <div key={index} >
              {message.sender === 'User' ? (
                <UserMessage text={message.text} botResponse={botResponse} />   // generate the User message component if it is a user message
              ) : (
                <BotMessage text={message.text} prog_lang={prog_lang} />  // generate the bot message if it is a bot message
              )}
            </div>
          ))}
          {isLoading && <div className="loading-indicator">Ada is typing...</div>}
          {/* This empty div represents the end of the chat */}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = `${e.target.scrollHeight-28}px`;
              adjustChatWindowHeight(e.target.scrollHeight);
            }}
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
    </div>
  );
}

export default ChatWindow;