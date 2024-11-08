import React from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfToText from 'react-pdftotext';

function CurriculumList ({prog_lang, subject, grade_level, student_name, curriculum, setProgLang, setSubject, setGradeLevel, setStudentName, setCurriculum}) {
  // generative AI model that will be used
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const onFileLoad = async (e) => {
    const file = e.target.files[0];
    console.log(file); 
    try {
      var text = await pdfToText(file)

      var obj_prompt = `Make a numbered list of the learning objectives or goals for these lessons. These lessons will be taught to ${grade_level} students. Do not include any information about what lesson it is coming from. If an objective for one lesson is the same as another lesson, do not include it twice. Condense the list if possible. Do not include any additional formatting on the text outside of the numbers for the list or any additional text outside of the list. Here is the text: ${text}.`

      var result = await model.generateContent(obj_prompt);
      var response = result.response;
      var obj = response.text();  
      console.log(`Objectives:\n${obj}`)

      var terms_prompt = `Make a comma separated list of the key terms a ${grade_level} student will need to know to understand these lessons.  Do not include any information about what lesson it is coming from. If the terms from one lesson are the same as another lesson, do not include it. Do not include any additional formatting on the text, just provide the comma separated key terms. Here is the text: ${text}.`;

      result = await model.generateContent(terms_prompt);
      response = result.response;
      var terms = response.text();  
      console.log(`Key Terms: ${terms}`)

      var skill_prompt = `Rate this unit on how difficult it is for a ${grade_level} student to understand. Rate it on a scale from 1 to 10, 1 being easiest and 10 being hardest. Do not include any additional text in your response outside of the numerical rating. Here is the unit text: ${text}.`;

      result = await model.generateContent(skill_prompt);
      response = result.response;
      var skill_level = response.text();  
      console.log(`Skill Level: ${skill_level}`)

      console.log(`name: ${student_name}`);

      // return text;  
    } catch (error) {
      console.log(error)
      // return 'There was an error with your file. Please try again later!';
    } 
  }

  return (
    <div className="CurriculumList">
      <p>Curriculum List</p>
      <div className="file-upload-container">
        <input type="file" accept=".pdf" onChange={(e) => onFileLoad(e)} />
      </div>
    </div>
  );
}

export default CurriculumList;