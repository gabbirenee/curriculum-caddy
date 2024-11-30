import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import Settings from './Settings';
import Curriculum from './Curriculum';
import Start from './Start';

function MainContent ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum, user_role, setUserRole}) {
  return (
    <div className="main-content">
        <Routes>
          <Route 
              exact 
              path="/start" 
              element={<Start user_role={user_role}/>} 
            />
            <Route 
              exact 
              path="/settings" 
              element={<Settings prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} user_role={user_role} setUserRole={setUserRole} />} 
            />
            {user_role === "teacher" && <Route 
              exact 
              path="/curriculum" 
              element={<Curriculum subject={subject} grade_level={grade_level} curriculum={curriculum} setCurriculum={setCurriculum} user_role={user_role} />} 
            />}
            <Route path="/" 
              element={<ChatWindow prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} user_role={user_role} />} 
            />
        </Routes>
    </div>
  );
};

export default MainContent;