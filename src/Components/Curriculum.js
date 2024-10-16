import React from 'react';
import '../App.css';
import CurriculumList from './CurriculumList.js';
import DocumentDetails from './DocumentDetails.js';

class Curriculum extends React.Component {
  render() {
    return (
      <div className="Curriculum">
        <p>Curriculum</p>
        <CurriculumList />
        <DocumentDetails />
      </div>
    );
  };
}

export default Curriculum;