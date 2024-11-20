import React, {useState, useEffect} from 'react';

function DocumentDetails ({curriculum, setCurriculum, selected, setSelected, selectedData, setSelectedData}) {
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
  }, [selectedData, curriculum]); 

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
      setCurriculum([...curriculum, newDoc]);
      setSelectedData(newDoc);
    }
  }

  const handleDiscard = () => {
    setDocName(selectedData.name);
    setDocStatus(selectedData.status)
    setKeyObj(selectedData.objectives);
    setKeyTerms(selectedData.key_terms);
    setSkill(selectedData.skill_level);
  }

  const handleDelete = () => {
    const userAck = window.confirm('This document will be deleted. This action cannot be undone. Click "OK" to proceed or "Cancel" to go back.'); 
    
    if (userAck) {
      setCurriculum(cur => cur.filter(item => item.id !== selectedData['id']));
      Array.from(document.querySelectorAll('.selected')).forEach(
        (el) => el.classList.remove('selected')
      );  // remove the selected class from all elements on the page
      setSelectedData({'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''});
      handleDiscard();  // this will update the fields on the page
    }
  }

  return (
    <div className="DocumentDetails">
      <h1>Document Details</h1>
      <div className="current-doc-details">
        <h3>Document Name</h3>
        <input
          value={docName}
          onChange={(e)=> setDocName(e.target.value)}
          placeholder="Example: Unit 1, Lesson 1"
        />
        <h3>Document Status</h3>
        <select value={docStatus} onChange={(e)=> setDocStatus(e.target.value)}>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <h3>Key Objectives</h3>
        <textarea
          value={keyObj}
          onChange={(e)=> setKeyObj(e.target.value)}
          placeholder="Add any key goals, objectives, or skills to learn."
        />
        <h3>Key Terms</h3>
        <textarea
          value={keyTerms}
          onChange={(e)=> setKeyTerms(e.target.value)}
          placeholder="Add any key terms that your students should understand for this lesson."
        />
        <h3>Skill Level</h3>
        <input
          type="number"
          value={skill}
          onChange={(e)=> setSkill(e.target.value)}
          min="1"
          max="10"
          step="1"
        />
        <button className="save-doc-changes" onClick={handleSave}>Save</button>
        <button className="discard-doc-changes" onClick={handleDiscard}>Discard Changes</button>
        <button className="delete-doc" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default DocumentDetails;