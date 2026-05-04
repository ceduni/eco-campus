import React, { useState, useEffect } from 'react';
import UniversityPanel from '../components/UniversityPanel';
import ScoreDetailPanel from '../components/ScoreDetailPanel';
import Map from '../components/Map';
import axios from 'axios';


function MapPage() {
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null); // make default null
  const [activeScore, setActiveScore] = useState(null);
  const [starsMeta, setStarsMeta] = useState([]);
  const [starsScores, setStarsScores] = useState({});
  const [ratiosMeta, setRatiosMeta] = useState([]);
  const [ratiosScores, setRatiosScores] = useState({});

  const handleInstitutionClick = (id) => {
    setSelectedInstitutionId(id);
    setActiveScore(null); // make sure we close the detail panel when selecting new institution
  };

  useEffect(() => {
    async function fetchAllData() {
      if (!selectedInstitutionId) return;
      try {
        const [starsMetaRes, ratiosMetaRes, scoresRes] = await Promise.all([
          axios.get('http://localhost:3001/metrics/stars'),
          axios.get('http://localhost:3001/metrics/ratios'),
          axios.post('http://localhost:3001/scores/scoresById', {
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

    fetchAllData();
  }, [selectedInstitutionId]);

  return (
    <div>
      <Map onInstitutionClick={handleInstitutionClick} />
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
          onClose={() => setSelectedInstitutionId(null)}
        />
      ) : null}
    </div>
  );
}


export default MapPage;
