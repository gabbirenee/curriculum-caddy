import React, {useState} from 'react';
import '../Styles/App.css';
import ToolBar from './ToolBar.js';
import {BrowserRouter} from 'react-router-dom';
import MainContent from './MainContent.js';

function App () {
    // the programming language that will be used in bot responses
    const [prog_lang, setProgLang] = useState('python');

    // the subject that is being focused on for the tutoring session
    const [subject, setSubject] = useState('computer science');
  
    // the grade level/range of the classroom
    const [grade_level, setGradeLevel] = useState('middle school');
  
    // the name of the learner
    const [student_name, setStudentName] = useState('Gabbi');

    // the role of the user: teacher vs. student
    const [user_role, setUserRole] = useState('teacher'); 

    // the curriculum info that the teacher has entered
    // const [curriculum, setCurriculum] = useState([]);
    const [curriculum, setCurriculum] = useState([{'id': 1,'name': `Test Doc 1`,'status': `not-started`,'objectives': 'asdf','key_terms': 'term1, term2', 'skill_level': '1','add_info': ''}, {'id': 2,'name': `Test Doc 2`,'status': `in-progress`,'objectives': 'lkjhj','key_terms': 'term3, term4', 'skill_level': '2','add_info': ''}, {'id': 3,'name': `Test Doc 3`,'status': `completed`,'objectives': 'iouwuiwui','key_terms': 'term5, term6','skill_level': '3','add_info': ''}]);

  return (
    <BrowserRouter>
        <div className="app">
          <ToolBar user_role={user_role} />
          <MainContent prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} user_role={user_role} setUserRole={setUserRole} />
        </div>
    </BrowserRouter>
  );
}

export default App;