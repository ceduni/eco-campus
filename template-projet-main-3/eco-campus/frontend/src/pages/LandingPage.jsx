import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import ChatButton from '../components/ChatButton';
import Map from '../components/Map';
import UniversityPanel from '../components/UniversityPanel';
import ScoreDetailPanel from '../components/ScoreDetailPanel';
import Header from '../components/Header'; 
import './LandingPage.css';
import axios from 'axios';
import UniversityComparisonPanel from '../components/ComparaisonPanel';
import CompareDetailPanel from '../components/CompDetailPanel';

const LandingPage = () => {
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [activeScore, setActiveScore] = useState(null);
  const [selectedInstitutionScore, setSelectedInstitutionScore] = useState(null);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);
  const [compareDetailMetric, setCompareDetailMetric] = useState(null); 
  const [isComparing, setIsComparing] = useState(false);

  const [starsMeta, setStarsMeta] = useState([]);
  const [starsScores, setStarsScores] = useState({});
  const [ratiosMeta, setRatiosMeta] = useState([]);
  const [ratiosScores, setRatiosScores] = useState({});
  const [showRatios, setShowRatios] = useState(true); 
  const [alphas, setAlphas] = useState(null);

  const handleInstitutionSelect = (id, score, source = 'default') => {
    setSelectedInstitutionId(id);
    setSelectedInstitutionScore(score);
    setActiveScore(null);
    setShowRatios(source !== 'stars');
    setShowComparisonPanel(false);
    setCompareDetailMetric(null);
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

  // 🔧 New logic to detect if a panel is open
  const isPanelOpen = !!(
    selectedInstitutionId ||
    activeScore ||
    showComparisonPanel ||
    compareDetailMetric
  );

  return (
    <div className="landing-container">
      <Map
        onMapReady={setMapInstance}
        onInstitutionClick={(id) => {
          setSelectedInstitutionId(id);
          setActiveScore(null);
          setSelectedInstitutionScore(null);
          setShowRatios(true);
          setShowComparisonPanel(false);
          setCompareDetailMetric(null);
        }}
      />

      <Header isPanelOpen={isPanelOpen} /> {/* ✅ Pass to Header */}

      <Sidebar
        mapInstance={mapInstance}
        onInstitutionSelect={handleInstitutionSelect}
        setAlphas={setAlphas}
        selectedIds={selectedUniversities}
        setSelectedIds={setSelectedUniversities}
        isComparing={isComparing}           
        setIsComparing={setIsComparing}     
        onCompareClick={() => {
          setShowComparisonPanel(true);
          setSelectedInstitutionId(null); 
          setActiveScore(null);
          setCompareDetailMetric(null);
        }}
      />

      {compareDetailMetric ? (
        <CompareDetailPanel
          metric={compareDetailMetric}
          idA={selectedUniversities[0]}
          idB={selectedUniversities[1]}
          onClose={() => setCompareDetailMetric(null)}
        />
      ) : showComparisonPanel && selectedUniversities.length === 2 ? (
        <UniversityComparisonPanel
          idA={selectedUniversities[0]}
          idB={selectedUniversities[1]}
          onClose={() => {
            setShowComparisonPanel(false);
            setIsComparing(false);
          }}
          onMetricClick={(metric) => setCompareDetailMetric(metric)} 
        />
      ) : activeScore ? (
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
          institutionScore={selectedInstitutionScore}
          onScoreClick={(scoreData) => setActiveScore(scoreData)}
          onClose={() => setSelectedInstitutionId(null)}
          showRatios={showRatios}
          alphas={alphas}
        />
      ) : null}
    </div>
  );
};

export default LandingPage;
