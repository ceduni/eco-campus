import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MapPage from './pages/MapPage';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/map">Aller à la map</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Bienvenue</h1>} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
