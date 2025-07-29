import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import ComponentTesting from './pages/ComponentTesting';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/test" element={<ComponentTesting />} />
      </Routes>
    </Router>
  );
}

export default App;


