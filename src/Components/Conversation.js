import React, { useState } from 'react';
import ToolBar from './ToolBar.js';
import ChatWindow from './ChatWindow.js';

function Conversation () {
  // the programming language that will be used in bot responses
  const [prog_lang, setProgLang] = useState('python');

  // the subject that is being focused on for the tutoring session
  const [subject, setSubject] = useState('computer science');

  // the subject that is being focused on for the tutoring session
  const [grade_level, setGradeLevel] = useState('middle school');

  // the subject that is being focused on for the tutoring session
  const [student_name, setStudentName] = useState('Gabbi');

  return (
    <div className="conversation">
      <ToolBar />
      <ChatWindow 
        prog_lang={prog_lang} 
        subject={subject} 
        grade_level={grade_level} 
        student_name={student_name}
      />
    </div>
  );
}

export default Conversation;