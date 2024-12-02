import React from 'react';
import YouTube from "react-youtube";

function Start ({user_role}) {
  const options = {
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
  };

  const onReady = (event) => {
      event.target.pauseVideo();
  };

  return (
    <div className='Start'>
      {user_role === 'student' && <div className='student-instructions'>
        <h1>Welcome to Curriculum Caddy!</h1>
        <YouTube className="youtube" videoId="eBXBK-1bpd4" options={options} onReady={onReady} id="video"/>
      </div>}
      {user_role === 'teacher' && <div className='teacher-instructions'>
        <h1>Welcome to Curriculum Caddy!</h1>
        <YouTube className="youtube" videoId="u-BeTsrmVD0" options={options} onReady={onReady} id="video"/>
      </div>}
    </div>
  );
}

export default Start;