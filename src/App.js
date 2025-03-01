import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import InvitationPage from './InvitationPage'; // Trang thư mời hiện tại
import HomePage from './HomePage'; // Trang khởi đầu mới

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/a-date-invitation" element={<HomePage />} />
          <Route path="/invitation" element={<InvitationPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;