import React from 'react';
import {useNavigate} from 'react-router-dom';
import Curriculum from './Curriculum.js';

function Settings ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum }) {
  const navigate = useNavigate(); 

  const handleClick = () => {
    console.log("Home Button Clicked");
    navigate('/');
  }

  return (
    <div className="Settings">
      <button onClick={handleClick}>Home</button>
      <p>Settings</p>
      <Curriculum prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} />
    </div>
  );
}

export default Settings;