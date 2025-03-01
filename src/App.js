import React from 'react';
import './App.css';
import Pong from './Pong.jpg';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>A Special Date Invitation</h1>
        <div className="image-container">
          <img src={Pong} alt="Couple" className="date-image" />
        </div>
        <p className="greeting">Hey Võ Ngọc Hoa,</p>
        <p className="invitation">
          Would you like to go on a date with me this weekend? Maybe dinner and a movie? Let me know! 💕
        </p>
        <p className="signature">Love, [Tên bạn]</p>
      </header>
    </div>
  );
}

export default App;