import React, {useState} from 'react';
import CurriculumList from './CurriculumList.js';
import DocumentDetails from './DocumentDetails.js';


function Curriculum ({subject, grade_level, curriculum, setCurriculum}) {
  // track the current document - when the component loads it will be set to a default, blank value
  const [selectedData, setSelectedData] = useState({'id': -1, 'name': '', 'status': 'not-started', 'objectives': '', 'key_terms': '', 'skill_level': 1, 'add_info': ''})
    
  return (
    <div className="Curriculum">
      <CurriculumList curriculum={curriculum} selectedData={selectedData} setSelectedData={setSelectedData} />
      <DocumentDetails subject={subject} grade_level={grade_level} curriculum={curriculum} setCurriculum={setCurriculum} selectedData={selectedData} setSelectedData={setSelectedData} />
    </div>
  );
}

export default Curriculum;