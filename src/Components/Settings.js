import React from 'react';
import { Tooltip } from 'react-tooltip'

function Settings ({prog_lang, subject, grade_level, student_name,setProgLang, setSubject, setGradeLevel, setStudentName, user_role, setUserRole }) {


  return (
    <div className="Settings">
      <div className="user-settings">
        <h1>User Settings</h1>
        <h4 className="inline-header">Name</h4>
        <input
          value={student_name}
          onChange={(e)=> {setStudentName(e.target.value); localStorage.setItem('student_name', e.target.value);}}
          placeholder="Name"
        />
        <div />
        <h4 className="inline-header">User Role</h4>
        <select value={user_role} onChange={(e)=> {setUserRole(e.target.value); localStorage.setItem('user_role', e.target.value);}}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      {user_role === "teacher" && <div className="classroom-settings">
        <h1 className="inline-header">Classroom Settings</h1>
        <svg className="info" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512" data-tooltip-id="tt_class_settings" data-tooltip-content="These settings will affect all students in your classroom.">
          {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
          <path className='info-icon' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
        <Tooltip id="tt_class_settings"/>
        <div />
        <h4 className="inline-header">Subject</h4>
        <input
          value={subject}
          onChange={(e)=> {setSubject(e.target.value); localStorage.setItem('subject', e.target.value);}}
          placeholder="Subject"
        />
        <div />
        <h4 className="inline-header">Grade Level</h4>
        <select value={grade_level} onChange={(e)=> {setGradeLevel(e.target.value); localStorage.setItem('grade_level', e.target.value);}}>
          <option value="elementary school">Elementary School</option>
          <option value="middle school">Middle School</option>
          <option value="high school">High School</option>
          <option value="college">College</option>
        </select>
        <div />
        <h4 className="inline-header">Preferred Programming Language</h4>
        <svg className="info" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512" data-tooltip-id="tt_prog_lang" data-tooltip-content="Leave blank if your subject does not require programming.">
          {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
          <path className='info-icon' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
        <Tooltip id="tt_prog_lang"/>
        <input
          value={prog_lang}
          onChange={(e)=> {setProgLang(e.target.value); localStorage.setItem('prog_lang', e.target.value);}}
          placeholder="Preferred Programming Language"
        />
        <div />
      </div>}
    </div>
  );
}

export default Settings;