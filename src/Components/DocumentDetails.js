import React, {useState, useEffect, useRef} from 'react';
import  {Tooltip} from 'react-tooltip';
import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfToText from 'react-pdftotext';
import base from '../base';
import { ref, update, remove } from "firebase/database";

function DocumentDetails ({subject, grade_level, curriculum, setCurriculum, selectedData, setSelectedData}) {
  // generative AI model that will be used
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const inputRef = useRef(null);

  const [docName, setDocName] = useState(selectedData.name);
  const [docStatus, setDocStatus] = useState(selectedData.status);
  const [keyObj, setKeyObj] = useState(selectedData.objectives);
  const [keyTerms, setKeyTerms] = useState(selectedData.key_terms);
  const [skill, setSkill] = useState(selectedData.skill_level);

  useEffect( () => {
    setDocName(selectedData.name);
    setDocStatus(selectedData.status)
    setKeyObj(selectedData.objectives);
    setKeyTerms(selectedData.key_terms);
    setSkill(selectedData.skill_level);

    // add the selected class to the selected document 
    Array.from(document.querySelectorAll('.document')).forEach(
      (el) => {
        if (parseInt(el.dataset.key) === selectedData['id']) {
          el.classList.add('selected');
        } 
      }
    );

    // show or hide the file input based on whether or not it is a new doc or existing doc
    if (selectedData['id'] === -1) {
      Array.from(document.querySelectorAll('.file-upload-container')).forEach(
        (el) => {
          el.classList.remove('hide');
        }
      );
    } else {
      Array.from(document.querySelectorAll('.file-upload-container')).forEach(
        (el) => {
          el.classList.add('hide');
        }
      );
    }

    // update the firebase database
    // set(ref(base, 'curriculum'), curriculum);
  }, [selectedData]); 

  const updateDB = (new_doc) => {
    // const cur_ref = ref(base, 'curriculum'); 
    // console.log(cur_ref);
    const updates = {};
    Object.values(curriculum).map((cur) => {
      // var cur_ref = ref(base, `${cur['id']}/`);
      // set(cur_ref, cur);
      updates[`${cur['id']}`] = cur;
    });
    updates[`${new_doc['id']}`] = new_doc;
    update(ref(base), updates);
  }

  const handleSave = () => {
    if (selectedData['id'] !== -1) {   // document already exists
      var newDoc = {
        'id': selectedData['id'],
        'name': docName,
        'status': docStatus,
        'objectives': keyObj,
        'key_terms': keyTerms, 
        'skill_level': skill,
        'add_info': ''
      };
      console.log(newDoc);
      setCurriculum(cur => cur.map(item => 
        item.id === selectedData['id'] ? { ...item, ...newDoc } : item
      ));
    } else {  // this is a new document
      var id = Date.now();
      newDoc = {
        'id': id,
        'name': docName,
        'status': docStatus,
        'objectives': keyObj,
        'key_terms': keyTerms, 
        'skill_level': skill,
        'add_info': ''
      };
      console.log('brand new doc!')
      console.log(newDoc);
      setCurriculum([...curriculum, newDoc]);
      setSelectedData(newDoc);
    }
    // show the placeholder document in list
    Array.from(document.querySelectorAll('.placeholder-doc')).forEach(
      (el) => {
        el.classList.add('hide');
      }
    );
    updateDB(newDoc);
  }

  const handleDiscard = () => {
    setDocName(selectedData.name);
    setDocStatus(selectedData.status)
    setKeyObj(selectedData.objectives);
    setKeyTerms(selectedData.key_terms);
    setSkill(selectedData.skill_level);
  }

  const handleDelete = () => {
    if (selectedData['id'] === -1) {
      handleDiscard();
    } else {
      const userAck = window.confirm('This document will be deleted. This action cannot be undone. Click "OK" to proceed or "Cancel" to go back.'); 
      
      if (userAck) {
        setCurriculum(cur => cur.filter(item => item.id !== selectedData['id']));
        const cur_ref = ref(base, `${selectedData['id']}/`);
        remove(cur_ref);
        Array.from(document.querySelectorAll('.selected')).forEach(
          (el) => el.classList.remove('selected')
        );  // remove the selected class from all elements on the page
        setSelectedData({'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''});
        handleDiscard();  // this will update the fields on the page

        // show the placeholder document in list
        Array.from(document.querySelectorAll('.placeholder-doc')).forEach(
          (el) => {
            el.classList.remove('hide');
          }
        );
      }
    }
  }

  const handleNewDoc = () => {
    setSelectedData({'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''});

    Array.from(document.querySelectorAll('.document')).forEach(
      (el) => {
        if (parseInt(el.dataset.key) === selectedData['id']) {
          el.classList.remove('selected');
        } 
      }
    );
    // show the placeholder document in list
    Array.from(document.querySelectorAll('.placeholder-doc')).forEach(
      (el) => {
        el.classList.remove('hide');
      }
    );
  }
  
  const clearInput = (input) => {
    input.value = '';
    input.disabled = false;
  }
    
  const onFileLoad = async (e) => {
    const file = e.target.files[0];
    e.target.disabled = true;
    // console.log(file); 
    if (file.size > 5242880) {
      alert("File size is limited to 4MB. Please try again with a smaller file.");
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
      updateDB(new_document);
      clearInput(e.target);
      console.log(new_document);
      setSelectedData(new_document);

      // hide the placeholder doc if it is showing
      Array.from(document.querySelectorAll('.placeholder-doc')).forEach(
        (el) => {
          el.classList.add('hide');
        }
    );

    } catch (error) {
      clearInput(e.target);
      console.log(error)
      // return 'There was an error with your file. Please try again later!';
    } 
  }  

  return (
    <div className="DocumentDetails">
      <div className="details-section">
        <h1 className='inline-header'>Document Details</h1>
        <svg className="info" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512" data-tooltip-id="tt_doc_details" data-tooltip-content="To add new curriculum details for the tutor to use, either fill in the details below or upload a document that AI will use to fill in the below information.">
          {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
          <path className='info-icon' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
        </svg>
        <Tooltip id="tt_doc_details"/>
        <div className="file-upload-container">
          <input type="file" accept=".pdf" ref={inputRef} onChange={(e) => onFileLoad(e)} />
        </div>
        <div className="current-doc-details">
          <h4 className="inline-header">Document Name</h4>
          <input
            value={docName}
            onChange={(e)=> setDocName(e.target.value)}
            placeholder="Example: Unit 1, Lesson 1"
          />
          <div />
          <h4 className="inline-header">Document Status</h4>
          <svg className="info" xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 512 512" data-tooltip-id="tt_doc_status" data-tooltip-content='Documents with a status of "Not Started" will not be passed to the AI tutor.'>
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
            <path className='info-icon' d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
          </svg>
          <Tooltip id="tt_doc_status"/>
          <select value={docStatus} onChange={(e)=> setDocStatus(e.target.value)}>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <h4>Key Objectives</h4>
          <textarea
            value={keyObj}
            onChange={(e)=> setKeyObj(e.target.value)}
            placeholder="Add any key goals, objectives, or skills to learn."
          />
          <h4>Key Terms</h4>
          <textarea
            value={keyTerms}
            onChange={(e)=> setKeyTerms(e.target.value)}
            placeholder="Add any key terms that your students should understand for this lesson."
          />
          <h4 className="inline-header">Skill Level</h4>
          <input 
            type="number"
            value={skill}
            onChange={(e)=> setSkill(e.target.value)}
            min="1"
            max="10"
            step="1"
          />
          <div className="doc-details-btns">
            <button className="save-doc-changes" onClick={handleSave}>Save</button>
            <button className="discard-doc-changes" onClick={handleDiscard}>Discard Changes</button>
            <button className="delete-doc" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </div>
      <div className="add-new-doc" onClick={handleNewDoc}>
          {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="36" viewBox="0 0 512 512">
            <path className='plus' d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </svg>
        New Document
      </div>
    </div>
  );
}

export default DocumentDetails;