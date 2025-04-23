import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InvitationPage from './InvitationPage';
import HomePage from './HomePage';
import backgroundMusic from './Shiki - 1000 Ánh Mắt ft. Obito (Official Music Video).mp3';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
      audioRef.current.loop = true; // Enable looping
      audioRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, []);
  return (
    <Router basename="/a-date-invitation">
      <div className="App">
        <audio ref={audioRef} src={backgroundMusic} />
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default page at /a-date-invitation/ */}
          <Route path="/invitation" element={<InvitationPage />} /> {/* Page at /a-date-invitation/invitation */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;