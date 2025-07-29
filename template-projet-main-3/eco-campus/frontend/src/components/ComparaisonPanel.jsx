import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreWidget from "../widgets/ScoreWidget";
import './ComparaisonPanel.css';
import './sharedPanel.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export default function UniversityComparisonPanel({ idA, idB, onClose }) {
  const [uniAData, setUniAData] = useState(null);
  const [uniBData, setUniBData] = useState(null);
  const [starsMeta, setStarsMeta] = useState({});
  const [ratiosMeta, setRatiosMeta] = useState({});
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resA, resB] = await Promise.all([
          axios.post('http://localhost:3001/scoresById', { id_institution: idA }),
          axios.post('http://localhost:3001/scoresById', { id_institution: idB })
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
        const res = await axios.get('http://localhost:3001/starsmetric');
        const meta = {};
        res.data.forEach(star => {
          meta[star.id_metric] = {
            denominateur: star.denominateur,
            name: star.name
          };
        });
        setStarsMeta(meta);
      } catch (err) {
        console.error("Erreur chargement meta stars:", err);
      }
    }

    async function fetchRatiosMeta() {
      try {
        const res = await axios.get('http://localhost:3001/ratios');
        console.log("Raw ratio meta response:", res.data);

        const meta = {};
        res.data.forEach(r => {
          meta[r.id_ratios] = {
            name: r.name
          };
        });
        setRatiosMeta(meta);
      } catch (err) {
        console.error("Erreur chargement meta ratios:", err);
        console.log("Ratios meta loaded:", meta);

      }
    }

    fetchData();
    fetchStarsMeta();
    fetchRatiosMeta();
  }, [idA, idB]);

  if (loading || !uniAData || !uniBData) return <div className="panel-container">Chargement des données...</div>;

  const getSharedMetrics = (aValues, bValues, meta = {}, type = 'stars') => {
    const ids = new Set(Object.keys(aValues).filter(id => bValues[id] !== undefined));
    console.log("Shared metrics for type", type, ":", Array.from(ids).map(id => ({
  id,
  name: meta[id]?.name
})));

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

  const ScoreCompareBar = ({ label, aScore, bScore, outOf, aLabel, bLabel, aLogo, bLogo, tooltip }) => {
    const percentageA = outOf ? (aScore / outOf) * 100 : aScore * 100;
    const percentageB = outOf ? (bScore / outOf) * 100 : bScore * 100;
    const aWins = aScore >= bScore;

    const winner = {
      score: aWins ? aScore : bScore,
      percentage: aWins ? percentageA : percentageB,
      label: aWins ? aLabel : bLabel,
      logo: aWins ? aLogo : bLogo,
      className: 'high'
    };

    const loser = {
      score: aWins ? bScore : aScore,
      percentage: aWins ? percentageB : percentageA,
      label: aWins ? bLabel : aLabel,
      logo: aWins ? bLogo : aLogo,
      className: 'low'
    };

    return (
      <div className="score-section">
        <div
          className="score-id"
          data-tooltip-id={`tooltip-${label}`}
          data-tooltip-content={tooltip || label}
        >
          {label}
        </div>
        <ReactTooltip id={`tooltip-${label}`} />

        <div className="bar-and-score">
          <img src={`/logos/${winner.logo}`} alt={winner.label} className="score-logo" />
          <div className="score-bar-container">
            <div className={`score-bar-fill ${winner.className}`} style={{ width: `${winner.percentage}%` }} />
          </div>
          <div className="score-value">{outOf ? `${winner.score} / ${outOf}` : winner.score.toFixed(2)}</div>
        </div>

        <div className="bar-and-score">
          <img src={`/logos/${loser.logo}`} alt={loser.label} className="score-logo" />
          <div className="score-bar-container">
            <div className={`score-bar-fill ${loser.className}`} style={{ width: `${loser.percentage}%` }} />
          </div>
          <div className="score-value">{outOf ? `${loser.score} / ${outOf}` : loser.score.toFixed(2)}</div>
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
                <img src={`/logos/${uniAData.logo}`} className="score-logo" /> {uniAData.institution_name}
              </div>
              <ScoreWidget score={uniAData.global_score} label={uniAData.institution_name} />
            </div>
            <div className="university-header">
              <div className="university-name">
                <img src={`/logos/${uniBData.logo}`} className="score-logo" /> {uniBData.institution_name}
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
