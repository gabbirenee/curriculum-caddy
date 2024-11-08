import React from 'react';
import CurriculumList from './CurriculumList.js';
import DocumentDetails from './DocumentDetails.js';

function Curriculum ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum}) {
  return (
    <div className="Curriculum">
      <p>Curriculum</p>
      <CurriculumList prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum}/>
      <DocumentDetails prog_lang={prog_lang} subject={subject} grade_level={grade_level} student_name={student_name} curriculum={curriculum} setProgLang={setProgLang} setSubject={setSubject} setGradeLevel={setGradeLevel} setStudentName={setStudentName} setCurriculum={setCurriculum} />
    </div>
  );
}

export default Curriculum;