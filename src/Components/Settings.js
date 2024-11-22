import React from 'react';

function Settings ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum, user_role, setUserRole }) {


  return (
    <div className="Settings">
      <div className="user-settings">
        <h1>User Settings</h1>
        <h4 className="inline-header">Name</h4>
        <input
          value={student_name}
          onChange={(e)=> setStudentName(e.target.value)}
          placeholder="Name"
        />
        <div />
        <h4 className="inline-header">User Role</h4>
        <select value={user_role} onChange={(e)=> setUserRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>
      {user_role === "teacher" && <div className="classroom-settings">
        <h1>Classroom Settings</h1>
        <h4 className="inline-header">Subject</h4>
        <input
          value={subject}
          onChange={(e)=> setSubject(e.target.value)}
          placeholder="Subject"
        />
        <div />
        <h4 className="inline-header">Grade Level</h4>
        <select value={grade_level} onChange={(e)=> setGradeLevel(e.target.value)}>
          <option value="elementary school">Elementary School</option>
          <option value="middle school">Middle School</option>
          <option value="high school">High School</option>
          <option value="college">College</option>
        </select>
        <div />
        <h4 className="inline-header">Preferred Programming Language</h4>
        <input
          value={prog_lang}
          onChange={(e)=> setProgLang(e.target.value)}
          placeholder="Preferred Programming Language"
        />
        <div />
      </div>}
    </div>
  );
}

export default Settings;