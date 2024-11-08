import React from 'react';
import ToolBar from './ToolBar.js';
import ChatWindow from './ChatWindow.js';

function Conversation ({prog_lang, grade_level, subject, student_name}) {
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