import React from 'react';
import '../App.css';
import Curriculum from './Curriculum.js';

class Settings extends React.Component {
  render() {
    return (
      <div className="Settings">
        <p>Settings</p>
        <Curriculum />
      </div>
    );
  };
}

export default Settings;