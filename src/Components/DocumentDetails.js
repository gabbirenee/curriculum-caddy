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
  }, [selectedData]); 

  const handleSave = () => {
    const newDoc = {
      'id': selectedData['id'],
      'name': docName,
      'status': docStatus,
      'objectives': keyObj,
      'key_terms': keyTerms, 
      'skill_level': skill,
      'add_info': ''
    };
    console.log(`new doc details: ${newDoc}`)

    setCurriculum(cur => cur.map(item => 
      item.id === selectedData['id'] ? { ...item, ...newDoc } : item
    ));
  }

  const handleDiscard = () => {
    setDocName(selectedData.name);
    setDocStatus(selectedData.status)
    setKeyObj(selectedData.objectives);
    setKeyTerms(selectedData.key_terms);
    setSkill(selectedData.skill_level);
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
      </div>
    </div>
  );
}

export default DocumentDetails;