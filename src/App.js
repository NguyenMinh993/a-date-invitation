import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>A Special Date Invitation</h1>
        <div className="image-container">
          <img src="/Pong.jpg" alt="Couple" className="date-image" />
        </div>
        <p className="greeting">Hey [Tên bạn gái],</p>
        <p className="invitation">
          Would you like to go on a date with me this weekend? Maybe dinner and a movie? Let me know! 💕
        </p>
        <div className="image-container">
          <img src="/clam.png" alt="Couple" className="date-image" />
          <a href="https://maps.app.goo.gl/zsXp8JrivXPUaPx96">Địa chỉ</a>
        </div>
        <p className="signature">Love, [Tên bạn]</p>
      </div>
    </div>
  );
}

export default App;