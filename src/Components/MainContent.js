import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ChatWindow from './ChatWindow';
import Settings from './Settings';
import Curriculum from './Curriculum';

function MainContent ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum}) {
  return (
    <div className="main-content">
        <Routes>
            <Route 
              exact 
              path="/settings" 
              element={<Settings prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} />} 
            />
            <Route 
              exact 
              path="/curriculum" 
              element={<Curriculum prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} />} 
            />
            <Route path="/" 
              element={<ChatWindow prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} />} 
            />
        </Routes>
    </div>
  );
};

export default MainContent;