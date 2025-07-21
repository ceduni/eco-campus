import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ComponentTesting from './pages/ComponentTesting';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/test" element={<ComponentTesting />} />
        <Route path="/rapport" element={<ReportPage />} />
      </Routes>
    </Router>
  );
}

export default App;
