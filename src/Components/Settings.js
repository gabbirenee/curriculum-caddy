import React from 'react';
import {useNavigate} from 'react-router-dom';
import Curriculum from './Curriculum.js';

function Settings () {
  const navigate = useNavigate(); 

  const handleClick = () => {
    console.log("Home Button Clicked");
    navigate('/');
  }

  return (
    <div className="Settings">
      <button onClick={handleClick}>Home</button>
      <p>Settings</p>
      <Curriculum />
    </div>
  );
}

export default Settings;