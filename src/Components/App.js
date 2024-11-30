import React, {useState, useEffect} from 'react';
import '../Styles/App.css';
import ToolBar from './ToolBar.js';
import {BrowserRouter} from 'react-router-dom';
import MainContent from './MainContent.js';
import base from '../base';
import { ref, onValue } from "firebase/database";

function App () {
    // the programming language that will be used in bot responses
    const [prog_lang, setProgLang] = useState(() => {
      if ("prog_lang" in localStorage) {
        return localStorage.getItem('prog_lang');
      } else {
        return 'python';
      }
    });

    // the subject that is being focused on for the tutoring session
    const [subject, setSubject] = useState(() => {
      if ("subject" in localStorage) {
        return localStorage.getItem('subject');
      } else {
        return 'computer science';
      }
    });
  
    // the grade level/range of the classroom
    const [grade_level, setGradeLevel] = useState(() => {
      if ("grade_level" in localStorage) {
        return localStorage.getItem('grade_level');
      } else {
        return 'middle school';
      }
    });
  
    // the name of the learner
    const [student_name, setStudentName] = useState(() => {
      if ("student_name" in localStorage) {
        return localStorage.getItem('student_name');
      } else {
        return 'Teacher';
      }
    });

    // the role of the user: teacher vs. student
    const [user_role, setUserRole] = useState(() => {
      if ("user_role" in localStorage) {
        return localStorage.getItem('user_role');
      } else {
        return 'teacher';
      }
    });

    // the curriculum info that the teacher has entered
    const [curriculum, setCurriculum] = useState([]);

    useEffect(() => {
      const query = ref(base);
      onValue(query, (snapshot) => {
        var data = snapshot.val();
        console.log(data)
        var cur = []; 
        if (snapshot.exists()) {
          for (const [key, value] of Object.entries(data)) {
            cur.push(value);
          }
          setCurriculum(cur);
        }
      });

    }, []);

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