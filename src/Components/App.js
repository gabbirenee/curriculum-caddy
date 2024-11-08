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
  
    // the grade level/range of the classroom
    const [grade_level, setGradeLevel] = useState('middle school');
  
    // the name of the learner
    const [student_name, setStudentName] = useState('Gabbi');

    // the curriculum info that the teacher has entered
    const [curriculum, setCurriculum] = useState([]);

  return (
    <BrowserRouter>
        <Routes>
            <Route 
              exact 
              path="/settings" 
              element={<Settings prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} />} 
            />
            <Route path="/" 
              element={<Conversation prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} />} 
            />
        </Routes>
    </BrowserRouter>
  );
}

export default App;