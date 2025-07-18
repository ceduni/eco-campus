import React, { useState } from 'react';
import UniversityPanel from '../components/UniversityPanel';
import ScoreDetailPanel from '../components/ScoreDetailPanel';

function MapPage() {
  const [activeScore, setActiveScore] = useState(null); // { id, score, outOf, description }

  return (
    <div>
      {activeScore ? (
        <ScoreDetailPanel data={activeScore} onBack={() => setActiveScore(null)} />
      ) : (
        <UniversityPanel onScoreClick={setActiveScore} />
      )}
    </div>
  );
}

export default MapPage;
