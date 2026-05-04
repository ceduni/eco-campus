import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreWidget from "../widgets/ScoreWidget";
import CompareDetailPanel from './CompDetailPanel'; 
import './ComparaisonPanel.css';
import './sharedPanel.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function UniversityComparisonPanel({ idA, idB, onClose }) {
  const [uniAData, setUniAData] = useState(null);
  const [uniBData, setUniBData] = useState(null);
  const [starsMeta, setStarsMeta] = useState({});
  const [ratiosMeta, setRatiosMeta] = useState({});
  const [selectedMetric, setSelectedMetric] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resA, resB] = await Promise.all([
          axios.post('http://localhost:3001/scores/scoresById', { id_institution: idA }),
          axios.post('http://localhost:3001/scores/scoresById', { id_institution: idB })
        ]);
        setUniAData(resA.data);
        setUniBData(resB.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setLoading(false);
      }
    }

    async function fetchStarsMeta() {
      try {
        const res = await axios.get('http://localhost:3001/metrics/stars');
        const meta = {};
        res.data.forEach(star => {
          meta[star.id_metric] = {
            id_metric: star.id_metric,         
            id_parent: star.id_parent,        
            denominateur: star.denominateur,
            name: star.name,
            description: star.description
          };
        });
        setStarsMeta(meta);
      } catch (err) {
        console.error("Erreur chargement meta stars:", err);
      }
    }

    async function fetchRatiosMeta() {
      try {
        const res = await axios.get('http://localhost:3001/metrics/ratios');
        const meta = {};
        res.data.forEach(r => {
          meta[r.id_ratios] = {
            name: r.name,
            description: r.description
          };
        });
        setRatiosMeta(meta);
      } catch (err) {
        console.error("Erreur chargement meta ratios:", err);
      }
    }

    fetchData();
    fetchStarsMeta();
    fetchRatiosMeta();
  }, [idA, idB]);

  const handleMetricClick = (metricId, isStar = true) => {
    const meta = isStar ? starsMeta[metricId] : ratiosMeta[metricId];
    setSelectedMetric({
      id: metricId,
      description: meta?.description || '',
      isStar
    });
  };

  if (loading) {
    return (
      <div className="panel-container">
        <div className="no-data-message">Chargement des données...</div>
      </div>
    );
  }

  if (
    !uniAData || !uniAData.stars_values || !uniAData.ratios_values || 
    !uniBData || !uniBData.stars_values || !uniBData.ratios_values
  ) {
    return (
      <div className="panel-container">
        <div className="no-data-message">Aucune donnée disponible pour cette comparaison.</div>
      </div>
    );
  }

  if (selectedMetric) {
    return (
      <CompareDetailPanel
        data={selectedMetric}
        onBack={() => setSelectedMetric(null)}
        uniAData={uniAData}
        uniBData={uniBData}
        starsMeta={starsMeta}
        ratiosMeta={ratiosMeta}
      />
    );
  }

  const getSharedMetrics = (aValues, bValues, meta = {}, type = 'stars') => {
    const ids = new Set(Object.keys(aValues).filter(id => bValues[id] !== undefined));
    return Array.from(ids).map(id => ({
      id,
      aScore: aValues[id],
      bScore: bValues[id],
      outOf: type === 'stars' ? (meta[id]?.denominateur || 5) : undefined,
      name: meta[id]?.name
    }));
  };

  const sharedStars = getSharedMetrics(uniAData.stars_values, uniBData.stars_values, starsMeta, 'stars');
  const sharedRatios = getSharedMetrics(uniAData.ratios_values, uniBData.ratios_values, ratiosMeta, 'ratios');

  const starsAWin = sharedStars.filter(m => m.aScore > m.bScore);
  const starsBWin = sharedStars.filter(m => m.bScore > m.aScore);
  const ratiosAWin = sharedRatios.filter(m => m.aScore > m.bScore);
  const ratiosBWin = sharedRatios.filter(m => m.bScore > m.aScore);

  const getLogoPath = (logo) => {
    if (!logo) return '';
    return `/logos/${logo.endsWith('.svg') ? logo : logo + '.svg'}`;
  };

  const ScoreCompareBar = ({ label, aScore, bScore, outOf, aLabel, bLabel, aLogo, bLogo, tooltip, onClick }) => {
  const isRatio = outOf === undefined;

  const percentageA = isRatio ? aScore : (aScore / outOf) * 100;
  const percentageB = isRatio ? bScore : (bScore / outOf) * 100;

  const aWins = aScore >= bScore;

  return (
    <div className="score-section clickable" onClick={onClick}>
      <div
        className="score-id"
        data-tooltip-id={`tooltip-${label}`}
        data-tooltip-content={tooltip || label}
      >
        {label}
      </div>
      <ReactTooltip id={`tooltip-${label}`} />

      {/* Winner bar */}
      <div className="bar-and-score">
        <img
          src={getLogoPath(aWins ? aLogo : bLogo)}
          alt={aWins ? aLabel : bLabel}
          className="score-logo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="score-bar-container">
          <div className="score-bar-fill high" style={{ width: `${aWins ? percentageA : percentageB}%` }} />
        </div>
        <div className="score-value">
          {isRatio ? (aWins ? aScore : bScore).toFixed(2) : `${aWins ? aScore : bScore} / ${outOf}`}
        </div>
      </div>

      {/* Loser bar */}
      <div className="bar-and-score">
        <img
          src={getLogoPath(aWins ? bLogo : aLogo)}
          alt={aWins ? bLabel : aLabel}
          className="score-logo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="score-bar-container">
          <div className="score-bar-fill low" style={{ width: `${aWins ? percentageB : percentageA}%` }} />
        </div>
        <div className="score-value">
          {isRatio ? (aWins ? bScore : aScore).toFixed(2) : `${aWins ? bScore : aScore} / ${outOf}`}
        </div>
      </div>
    </div>
  );
};


  return (
    <div className="panel-container">
      <div className="university-panel-scrollable">
        <div className="university-panel">
          <button className="close-button" onClick={onClose}>×</button>

          {/* Header */}
          <div className="comparison-header">
            <div className="university-header">
              <div className="university-name">
                {uniAData.logo && (
                  <img
                    src={getLogoPath(uniAData.logo)}
                    alt={uniAData.institution_name}
                    className="score-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {uniAData.institution_name}
              </div>
              <ScoreWidget score={uniAData.global_score} label={uniAData.institution_name} />
            </div>
            <div className="university-header">
              <div className="university-name">
                {uniBData.logo && (
                  <img
                    src={getLogoPath(uniBData.logo)}
                    alt={uniBData.institution_name}
                    className="score-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {uniBData.institution_name}
              </div>
              <ScoreWidget score={uniBData.global_score} label={uniBData.institution_name} />
            </div>
          </div>

          {/* STARS Section */}
          <div className="stars-header">
            <h3 className="mini-header">STARS</h3>
            <p className="stars-definition">Sustainability Tracking, Assessment & Rating System</p>
          </div>

          <div className="score-section">
            <h4 className="score-section-title">{uniAData.institution_name} : Points forts</h4>
            {starsAWin.map(metric => (
              <ScoreCompareBar
                key={metric.id}
                label={metric.id}
                aScore={metric.aScore}
                bScore={metric.bScore}
                outOf={metric.outOf}
                aLabel={uniAData.institution_name}
                bLabel={uniBData.institution_name}
                aLogo={uniAData.logo}
                bLogo={uniBData.logo}
                tooltip={metric.name}
                onClick={() => handleMetricClick(metric.id, true)}
              />
            ))}
          </div>

          <div className="score-section">
            <h4 className="score-section-title">{uniBData.institution_name} : Points forts</h4>
            {starsBWin.map(metric => (
              <ScoreCompareBar
                key={metric.id}
                label={metric.id}
                aScore={metric.aScore}
                bScore={metric.bScore}
                outOf={metric.outOf}
                aLabel={uniAData.institution_name}
                bLabel={uniBData.institution_name}
                aLogo={uniAData.logo}
                bLogo={uniBData.logo}
                tooltip={metric.name}
                onClick={() => handleMetricClick(metric.id, true)}
              />
            ))}
          </div>

          {/* RATIOS Section */}
          <h3 className="mini-header">Observations</h3>

          <div className="score-section">
            <h4 className="score-section-title">{uniAData.institution_name} : Points forts</h4>
            {ratiosAWin.map(metric => (
              <ScoreCompareBar
                key={metric.id}
                label={metric.id}
                aScore={metric.aScore}
                bScore={metric.bScore}
                aLabel={uniAData.institution_name}
                bLabel={uniBData.institution_name}
                aLogo={uniAData.logo}
                bLogo={uniBData.logo}
                tooltip={metric.name}
                onClick={() => handleMetricClick(metric.id, false)}
              />
            ))}
          </div>

          <div className="score-section">
            <h4 className="score-section-title">{uniBData.institution_name} : Points forts</h4>
            {ratiosBWin.map(metric => (
              <ScoreCompareBar
                key={metric.id}
                label={metric.id}
                aScore={metric.aScore}
                bScore={metric.bScore}
                aLabel={uniAData.institution_name}
                bLabel={uniBData.institution_name}
                aLogo={uniAData.logo}
                bLogo={uniBData.logo}
                tooltip={metric.name}
                onClick={() => handleMetricClick(metric.id, false)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
