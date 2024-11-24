import React from 'react';

function Start ({user_role}) {
  return (
    <div className='Start'>
      {user_role === 'student' && <div className='student-instructions'>
        <h1>Welcome to Curriculum Caddy!</h1>
        <p>This tool is here to help you understand concepts and ask questions related to your class. To get the most out of Curriculum Caddy, keep the following in mind: </p>
        <ul>
            <li><b>Ask Ada</b> - The "Ask Ada" page is where you will talk to Curriculum Caddy. Ada is a tutor that is designed to help you with anything you need for this class. Ask Ada to explain different terms you heard in class, homework problems you are struggling with, or any other questions that come to mind. Here are some examples of things you can ask:</li>
            <ul>
                <li><i>"I don't understand this term: [insert term]."</i></li>
                <li><i>"Can you give an example of [concept]?"</i></li>
                <li><i>"Why is my code not working: [describe your problem]?"</i></li>
                <li><i>"Help me study [unit or lesson]."</i></li>
                <li><i>"Quiz me on [concept]."</i></li>
            </ul>
            <li><b>Settings</b> - Be sure to add your name on the settings page so Ada knows who she is working with!</li>
        </ul>
        <p>Remember, don't be afraid to make mistakes! Ada is here to help you and won't judge what you know or don't know. Also, don't be afraid to ask your teacher if you are unsure about something.</p>
        <p>Happy Learning! 😊</p>
      </div>}
      {user_role === 'teacher' && <div className='teacher-instructions'>
        <h1>Welcome to Curriculum Caddy!</h1>
        <p>This tool is designed to help you and your students understand concepts and ask questions related to your class. To get the most out of Curriculum Caddy, keep the following information in mind: </p>
        <ul>
            <li><b>Ask Ada</b> - The "Ask Ada" page is where you will talk to Curriculum Caddy. Ada is a tutor that is designed to help you with anything you need for this class. Ask Ada to explain different terms, suggest different methods for teaching specific concepts, or any other questions that come to mind. Here are some examples of things you can ask:</li>
            <ul>
                <li><i>"I don't understand this term: [insert term]."</i></li>
                <li><i>"Can you give an example of [concept]?"</i></li>
                <li><i>"Why is my code not working: [describe your problem]?"</i></li>
                <li><i>"Help me prepare for [unit or lesson]."</i></li>
                <li><i>"How would you explain [concept] to my class?"</i></li>
            </ul>
            <li><b>Curriculum</b> - The real benefit of Curriculum Caddy comes in when you upload your lesson plans or curriculum into the tool. This gives the AI context into what you are learning in the classroom, allowing it to provide both students and teachers more targeted answers and guidance. Here is the process of adding curriculum into the tool:</li>
            <ol>
                <li>Upload your lesson plans or curriculum as a PDF. </li>
                <li>The AI will read through your document and generate lesson objectives, key terminology, and the skill level required for the lesson. </li>
                <li>Review the details that the AI fills in and make edits as needed. Remember, this is what will be given to the AI to provide it context into your curriculum so it's important to get the details right. </li>
                <li>Click Save and your curriculum will be uploaded. </li>
                <li>Alternatively, if you don't have PDFs to upload, you can enter in the details for each lesson or unit manually.</li>
            </ol>
            <li><b>Settings</b> - This is where you can adjust both your personal and classroom settings. Personal settings include things like your name while classroom settings include the subject of your class, grade level, and preferred programming language (if applicable).</li>
        </ul>
        <p>Your students can also use Curriculum Caddy. Ada will act as a tutor and will guide them to the answers using examples and follow-up questions. To help your students get the most out of the tool, try the following techniques:</p>
        <ul>
            <li>Encourage students to use Curriculum Caddy for homework, projects, exam prep, and free time in class. </li>
            <li>Use the tool during class for quick demonstrations or examples. </li>
            <li>Assign specific questions to have your students ask the tool when going through homework. </li>
            <li>Encourage them to follow-up with you if they have questions about anything that Ada tells them. </li>
        </ul>
        <p>Happy Teaching! 😊</p>
      </div>}
    </div>
  );
}

export default Start;