import React, { useState, useEffect } from 'react';
import UniversityPanel from '../components/UniversityPanel';
import ScoreDetailPanel from '../components/ScoreDetailPanel';
import axios from 'axios';

function MapPage() {
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(1);
  const [activeScore, setActiveScore] = useState(null);

  const [starsMeta, setStarsMeta] = useState([]);
  const [starsScores, setStarsScores] = useState({});

  const [ratiosMeta, setRatiosMeta] = useState([]);
  const [ratiosScores, setRatiosScores] = useState({});

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [starsMetaRes, ratiosMetaRes, scoresRes] = await Promise.all([
          axios.get('http://localhost:3001/starsmetric'),
          axios.get('http://localhost:3001/ratios'),
          axios.post('http://localhost:3001/scoresById', {
            id_institution: selectedInstitutionId,
          }),
        ]);

        setStarsMeta(starsMetaRes.data);
        setRatiosMeta(ratiosMetaRes.data);
        setStarsScores(scoresRes.data.stars_values || {});
        setRatiosScores(scoresRes.data.ratios_values || {});
      } catch (err) {
        console.error("Erreur chargement des métadonnées:", err);
      }
    }

    if (selectedInstitutionId) {
      fetchAllData();
    }
  }, [selectedInstitutionId]);

  return (
    <div>
      {activeScore ? (
        <ScoreDetailPanel
          data={activeScore}
          starsMeta={starsMeta}
          starsScores={starsScores}
          ratiosMeta={ratiosMeta}
          ratiosScores={ratiosScores}
          onBack={() => setActiveScore(null)}
        />
      ) : selectedInstitutionId ? (
        <UniversityPanel
          institutionId={selectedInstitutionId}
          onScoreClick={(scoreData) => setActiveScore(scoreData)}
          onClose={() => setSelectedInstitutionId(null)} // Close panel
        />
      ) : null} {/* renders nothing when no institution is selected */}
    </div>
  );
}

export default MapPage;
