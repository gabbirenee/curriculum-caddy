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

      var obj_prompt = `Make a list of the learning objectives or goals for these lessons on ${subject}. These lessons will be taught to ${grade_level} students. Do not include any information about what lesson it is coming from. If an objective for one lesson is the same as another lesson, do not include it twice. Condense the list if possible. Do not include any additional formatting on the text, just provide each objective on its own line. Here is the text: ${text}.`

      var result = await model.generateContent(obj_prompt);
      var response = result.response;
      var obj = response.text();  
      obj = obj.split('\n')
      console.log(obj)
      if (obj[obj.length-1] === "") {
        obj.pop();
      }
      console.log(obj)
      // console.log(`Objectives:\n${obj}`)

      var terms_prompt = `Make a list of the key ${subject} terms from these lessons that a a ${grade_level} student should know. Do not include any information about what lesson it is coming from. If the terms from one lesson are the same as another lesson, do not include it. Do not include any additional formatting on the text, just provide each term on its own line. Here is the text: ${text}.`;

      result = await model.generateContent(terms_prompt);
      response = result.response;
      var terms = response.text();  
      // terms = terms.replace(/(\r\n|\n|\r)/gm, "");
      terms = terms.split('\n')
      console.log(terms)
      // console.log(`Key Terms: ${terms}`)

      var skill_prompt = `Rate this unit on how difficult it is for a ${grade_level} student to understand. Rate it on a scale from 1 to 10, 1 being easiest and 10 being hardest. Do not include any additional text in your response outside of the numerical rating. Do not include any new lines. Here is the unit text: ${text}.`;

      result = await model.generateContent(skill_prompt);
      response = result.response;
      var skill_level = response.text();  
      skill_level = skill_level.replace(/(\r\n|\n|\r)/gm, "");
      skill_level = parseInt(skill_level)
      // console.log(`Skill Level: ${skill_level}`)

      var new_document = {
        'id': Date.now(),
        'name': `Document ${curriculum.length}`,
        'status': `Not Started`,
        'objectives': obj,
        'key_terms': terms, 
        'skill_level': skill_level,
        'add_info': ''
      };

      setCurriculum([...curriculum, new_document]);
      console.log(new_document)
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