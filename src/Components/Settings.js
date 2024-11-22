import React from 'react';

function Settings ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum, user_role, setUserRole }) {
  return (
    <div className="Settings">
      <div className="user-settings">
        <p>Settings</p>
      </div>
    </div>
  );
}

export default Settings;