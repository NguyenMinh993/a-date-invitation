import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import InvitationPage from './InvitationPage';
import HomePage from './HomePage';

function App() {
  return (
    <Router basename="/a-date-invitation">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Default page at /a-date-invitation/ */}
          <Route path="/invitation" element={<InvitationPage />} /> {/* Page at /a-date-invitation/invitation */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;