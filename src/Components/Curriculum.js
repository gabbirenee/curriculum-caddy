import React from 'react';
import CurriculumList from './CurriculumList.js';
import DocumentDetails from './DocumentDetails.js';

function Curriculum () {
  return (
    <div className="Curriculum">
      <p>Curriculum</p>
      <CurriculumList />
      <DocumentDetails />
    </div>
  );
}

export default Curriculum;