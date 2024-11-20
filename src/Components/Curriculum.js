import React, {useRef, useState} from 'react';
import CurriculumList from './CurriculumList.js';
import DocumentDetails from './DocumentDetails.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfToText from 'react-pdftotext';


function Curriculum ({subject, grade_level, curriculum, setCurriculum}) {
  const inputRef = useRef(null);

  // track the current document - when the component loads it will be set to a default, blank value
  // const [selected, setSelected] = useState([{'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''}]);
  // Holds the selected element
  // const [selected, setSelected] = useState([]);
  // Holds the selected elements data
  const [selectedData, setSelectedData] = useState({'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''})

  // generative AI model that will be used
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const clearInput = (input) => {
    input.value = '';
    input.disabled = false;
  }
  
  const onFileLoad = async (e) => {
    const file = e.target.files[0];
    e.target.disabled = true;
    // console.log(file); 
    if (file.size > 2097152) {
      alert("File size is limited to 2MB. Please try again with a smaller file.");
      clearInput(e.target);
      return;
    }

    try {
      var text = await pdfToText(file)

      var obj_prompt = `Make a list of the learning objectives or skills to learn for these lessons on ${subject}. These lessons will be taught to ${grade_level} students. Do not include any information about what lesson it is coming from. If an objective for one lesson is the same as another lesson, do not include it twice. Condense the list if possible. Do not include any additional formatting on the text, just provide each objective on its own line. Here is the text: ${text}.`

      var result = await model.generateContent(obj_prompt);
      var response = result.response;
      var obj = response.text();  
      // console.log(`Objectives:\n${obj}`);

      var terms_prompt = `Make a list of the key ${subject} terms from these lessons that a ${grade_level} student should know. Do not include any information about what lesson it is coming from. If the terms from one lesson are the same as another lesson, do not include it. Do not include any additional formatting on the text, just provide each term on its own line. Here is the text: ${text}.`;

      result = await model.generateContent(terms_prompt);
      response = result.response;
      var terms = response.text();  
      // console.log(`Key Terms:\n${terms}`);

      var skill_prompt = `Rate this unit on how difficult it is for a ${grade_level} student to understand. Rate it on a scale from 1 to 10, 1 being easiest and 10 being hardest. Do not include any additional text in your response outside of the numerical rating. Do not include any new lines. Here is the unit text: ${text}.`;

      result = await model.generateContent(skill_prompt);
      response = result.response;
      var skill_level = response.text();  
      skill_level = parseInt(skill_level.replace(/(\r\n|\n|\r)/gm,""));
      // console.log(`Skill Level:\n${skill_level}`);

      var new_document = {
        'id': Date.now(),
        'name': `Document ${curriculum.length + 1}`,
        'status': 'not-started',
        'objectives': obj,
        'key_terms': terms, 
        'skill_level': skill_level,
        'add_info': ''
      };

      setCurriculum([...curriculum, new_document]);
      clearInput(e.target);
      console.log(new_document);
      setSelectedData(new_document);

    } catch (error) {
      clearInput(e.target);
      console.log(error)
      // return 'There was an error with your file. Please try again later!';
    } 
  }
    
  return (
    <div className="Curriculum">
      <CurriculumList curriculum={curriculum} selectedData={selectedData} setSelectedData={setSelectedData} />
      <div className="file-upload-container">
        <input type="file" accept=".pdf" ref={inputRef} onChange={(e) => onFileLoad(e)} />
      </div>
      <DocumentDetails curriculum={curriculum} setCurriculum={setCurriculum} selectedData={selectedData} setSelectedData={setSelectedData} />
    </div>
  );
}

export default Curriculum;