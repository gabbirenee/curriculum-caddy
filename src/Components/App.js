import React, {useState} from 'react';
import '../Styles/App.css';
import Conversation from './Conversation.js';
import Settings from './Settings.js';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App () {
    // the programming language that will be used in bot responses
    const [prog_lang, setProgLang] = useState('python');

    // the subject that is being focused on for the tutoring session
    const [subject, setSubject] = useState('computer science');
  
    // the subject that is being focused on for the tutoring session
    const [grade_level, setGradeLevel] = useState('middle school');
  
    // the subject that is being focused on for the tutoring session
    const [student_name, setStudentName] = useState('Gabbi');

  return (
    <BrowserRouter>
        <Routes>
            <Route 
              exact 
              path="/settings" 
              element={<Settings grade_level={grade_level} />} 
            />
            <Route path="/" 
              element={<Conversation prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} />} 
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;