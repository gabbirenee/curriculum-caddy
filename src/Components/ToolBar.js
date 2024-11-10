import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function ToolBar () {
  const navigate = useNavigate(); 
  const homeRef = useRef(null);

  // use for selection styling in navigation
  const [currentPage, setCurrentPage] = useState([]);

  useEffect(() => {
    setCurrentPage([homeRef.current])
  }, []);

  const handleNavigation = (e) => {
    if (!currentPage.includes(e.target)) {
      if (currentPage[0]) {
        currentPage[0].classList.remove('current-page');
      }
      setCurrentPage([e.target]);
      e.target.classList.add('current-page');
    } 
  }

  const handleCurriculumClick = (e) => {
    handleNavigation(e);
    console.log("Curriculum Button Clicked");
    navigate('/curriculum');
  }

  const handleConversationClick = (e) => {
    handleNavigation(e);
    console.log("Conversation Button Clicked");
    navigate('/');
  }

  const handleSettingsClick = (e) => {
    handleNavigation(e);
    console.log("Settings Button Clicked");
    navigate('/settings');
  }

  return (
    <div className="tool-bar">
      <div className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" height="45" width="45" viewBox="0 0 512 512">
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
              <path className="logo-icon" d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z"/>
        </svg>  
        Curriculum Caddy
      </div>
      <div className="navigation">
        <button className="conversation-button current-page" onClick={handleConversationClick} ref={homeRef}>
            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512">
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
              <path className='conversation-icon' d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l96 0 0 80c0 6.1 3.4 11.6 8.8 14.3s11.9 2.1 16.8-1.5L309.3 416 448 416c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0z"/>
            </svg>
            Ask Ada
        </button>
        <button className="curriculum-button" onClick={handleCurriculumClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512">
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
              <path className='curriculum-icon' d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 125.7-86.8 86.8c-10.3 10.3-17.5 23.1-21 37.2l-18.7 74.9c-2.3 9.2-1.8 18.8 1.3 27.5L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128zM549.8 235.7l14.4 14.4c15.6 15.6 15.6 40.9 0 56.6l-29.4 29.4-71-71 29.4-29.4c15.6-15.6 40.9-15.6 56.6 0zM311.9 417L441.1 287.8l71 71L382.9 487.9c-4.1 4.1-9.2 7-14.9 8.4l-60.1 15c-5.5 1.4-11.2-.2-15.2-4.2s-5.6-9.7-4.2-15.2l15-60.1c1.4-5.6 4.3-10.8 8.4-14.9z"/>
            </svg>
            Curriculum
        </button>
        <button className="settings-button" onClick={handleSettingsClick}>
            <svg xmlns="http://www.w3.org/2000/svg" height="23" width="23" viewBox="0 0 512 512">
            {/* Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc */}
              <path className='settings-icon' d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"/>
            </svg>
            Settings
        </button>
      </div>  
    </div>
  );
}

export default ToolBar;