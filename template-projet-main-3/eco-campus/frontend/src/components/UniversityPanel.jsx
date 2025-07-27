import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreWidget from "../widgets/ScoreWidget";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 
import './UniversityPanel.css';
import './sharedPanel.css';

function UniversityHeader({ name, score, tier }) {
  return (
    <div className="university-header">
      <div className="university-name">{name}</div>
      <div className="university-medal">
        <ScoreWidget score={score} label={name} tier={tier} />
      </div>
    </div>
  );
}

function ScoreBar({ id, score, outOf, description, onClick, metricName, isRatio = false }) {
  const percentage = outOf ? (score / outOf) * 100 : 0;
  let fillClass = "low";
  if (percentage >= 80) fillClass = "high";
  else if (percentage >= 50) fillClass = "medium";

  return (
    <div className="score-box-horizontal" onClick={() => onClick?.({ id, score, outOf, description, metricName })}>
      <Tooltip id={`tooltip-${id}`} place="top" effect="solid" />
      <div className="bar-and-score">
        <div className="score-id" data-tooltip-id={`tooltip-${id}`} data-tooltip-content={metricName}>
          {id}
        </div>
        <div className="score-bar-container">
          <div className={`score-bar-fill ${fillClass}`} style={{ width: `${percentage}%` }} />
        </div>
        <div className="score-value">
          {isRatio ? score : `${score} / ${outOf}`}
        </div>
      </div>
    </div>
  );
}


function sortByNumericId(arr) {
  return arr.sort((a, b) => {
    const extractNumbers = id => {
      const match = id.match(/(\d+)/g);
      return match ? match.map(Number) : [Infinity];
    };
    const [a1, a2] = extractNumbers(a.id);
    const [b1, b2] = extractNumbers(b.id);
    return a1 - b1 || (a2 || 0) - (b2 || 0);
  });
}

export default function UniversityPanel({ institutionId = 1, onScoreClick, onClose }) {
  const [institutionName, setInstitutionName] = useState('');
  const [score, setScore] = useState(0);
  const [tier, setTier] = useState('');
  const [stars, setStars] = useState([]);
  const [ratios, setRatios] = useState([]);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [ratiosRes, starsRes, scoresRes] = await Promise.all([
          axios.get('http://localhost:3001/ratios'),
          axios.get('http://localhost:3001/starsmetric'),
          axios.post('http://localhost:3001/scoresById', {
            id_institution: institutionId
          })
        ]);

        const ratioMeta = ratiosRes.data;
        const starsMeta = starsRes.data;
        const scoreData = scoresRes.data;

        const combinedRatios = ratioMeta.map(meta => ({
          id: meta.id_ratios,
          name: meta.name,
          description: meta.description,
          score: scoreData.ratios_values?.[meta.id_ratios] ?? 0
        }));

        const combinedStars = starsMeta
          .filter(meta => meta.id_parent === null)
          .map(meta => ({
            id: meta.id_metric,
            name: meta.name,
            description: meta.description,
            category: meta.category,
            score: scoreData.stars_values?.[meta.id_metric] ?? 0,
            outOf: meta.denominateur
          }));

        setRatios(sortByNumericId(combinedRatios));
        setStars(sortByNumericId(combinedStars));

        setInstitutionName(scoreData.institution_name || "Université");
        setScore(scoreData.global_score ?? 0);
        setTier(computeTier(scoreData.global_score));
      } catch (err) {
        console.error("Erreur de chargement:", err);
      }
    }

    fetchAll();
  }, [institutionId]);

  function computeTier(score) {
    if (score >= 300) return "gold";
    if (score >= 200) return "silver";
    if (score >= 100) return "bronze";
    return "participant";
  }

  return (
    <div className="panel-container">
      <div className="university-panel-scrollable">
        <div className="university-panel">
          <button className="close-button" onClick={onClose}>×</button>

          <UniversityHeader name={institutionName} score={score} tier={tier} />

          <div className="score-section">
            <h4 className="score-section-title">STARS</h4>
            <h6 className="score-section-description">
              The Sustainability Tracking, Assessment & Rating System
            </h6>
            <div className="score-grid">
              {stars.map(metric => (
                <ScoreBar
                  key={metric.id}
                  id={metric.id}
                  score={metric.score}
                  outOf={metric.outOf}
                  metricName={metric.name}
                  description={metric.description}
                  denominateur={metric.denominateur}
                  onClick={onScoreClick}
                />
              ))}
            </div>
          </div>

          <div className="score-section">
            <h4 className="score-section-title">Observations</h4>
            <div className="score-grid">
              {ratios.map(metric => (
                <ScoreBar
                  key={metric.id}
                  id={metric.id}
                  score={metric.score}
                  metricName={metric.name}
                  description={metric.description}
                  onClick={onScoreClick}
                  isRatio={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
