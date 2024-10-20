import React from 'react';
import '../Styles/App.css';
import Conversation from './Conversation.js';
import Settings from './Settings.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App () {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/settings" element={<Settings />} />
            <Route path="/" element={<Conversation />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;