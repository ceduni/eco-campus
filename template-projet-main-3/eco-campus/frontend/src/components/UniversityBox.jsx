import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreWidget from "../widgets/ScoreWidget";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import './UniversityBox.css';
import './sharedPanel.css';

function computeTier(score) {
  if (score >= 300) return 'gold';
  if (score >= 200) return 'silver';
  if (score >= 100) return 'bronze';
  return 'participant';
}

function UniversityHeader({ name, score }) {
  return (
    <div className="ubox-header">
      <div className="ubox-name">{name}</div>
      <div className="ubox-medal">
        <ScoreWidget score={score ?? 0} label={name} tier={computeTier(score ?? 0)} />
      </div>
    </div>
  );
}

function ScoreBar({ id, score, outOf, description, onClick, metricName, isRatio = false }) {
  const [tooltipReady, setTooltipReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTooltipReady(true), 0);
    return () => clearTimeout(t);
  }, []);

  let percentage = 0;
  if (isRatio) percentage = score ?? 0;
  else percentage = outOf ? ((score ?? 0) / outOf) * 100 : 0;

  let fillClass = 'low';
  if (percentage >= 80) fillClass = 'high';
  else if (percentage >= 50) fillClass = 'medium';

  return (
    <div className="ubox-scorebox" onClick={() => onClick?.({ id, score, outOf, description, metricName })}>
      {tooltipReady && (
        <Tooltip anchorSelect={`[data-tooltip-anchor="${id}"]`} place="top" effect="solid" />
      )}
      <div className="ubox-barline">
        <div
          className="ubox-scoreid"
          data-tooltip-anchor={id}
          data-tooltip-content={metricName || description}
        >
          {id}
        </div>
        <div className="ubox-bar">
          <div className={`ubox-barfill ${fillClass}`} style={{ width: `${percentage}%` }} />
        </div>
        <div className="ubox-scoreval">
          {isRatio ? (score ?? 0) : `${score ?? 0} / ${outOf ?? 0}`}
        </div>
      </div>
    </div>
  );
}

function sortByAlphas(list, alphas, isRatio = false) {
  if (!alphas) return list;
  const coeffs = isRatio ? alphas.coeff_ratio : alphas.coeff_op;
  return [...list].sort((a, b) => (coeffs?.[b.id] ?? 0) - (coeffs?.[a.id] ?? 0));
}

export default function UniversityBox({
  institutionId,
  institutionName,
  initialGlobalScore,
  alphas,
  onMetricClick,
  onExpand,                     
}) {
  const [globalScore, setGlobalScore] = useState(initialGlobalScore ?? 0);
  const [stars, setStars] = useState([]);
  const [ratios, setRatios] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function fetchAll() {
      try {
        const [ratiosRes, starsRes, scoresRes] = await Promise.all([
          axios.get('http://localhost:3001/metrics/ratios'),
          axios.get('http://localhost:3001/metrics/stars'),
          axios.post('http://localhost:3001/scores/scoresById', { id_institution: institutionId }),
        ]);

        if (!mounted) return;

        const ratioMeta = ratiosRes.data;
        const starsMeta = starsRes.data;
        const sdata = scoresRes.data || {};

        const ratiosCombined = ratioMeta
          .filter(m => !alphas?.coeff_ratio || alphas.coeff_ratio[m.id_ratios] !== 0)
          .map(m => ({
            id: m.id_ratios,
            name: m.name,
            description: m.description,
            score: sdata.ratios_values?.[m.id_ratios] ?? 0,
          }));

        const starsCombined = starsMeta
          .filter(m => m.id_parent === null)
          .filter(m => !alphas?.coeff_op || alphas.coeff_op[m.id_metric] !== 0)
          .map(m => ({
            id: m.id_metric,
            name: m.name,
            description: m.description,
            category: m.category,
            score: sdata.stars_values?.[m.id_metric] ?? 0,
            outOf: m.denominateur,
          }));

        setRatios(sortByAlphas(ratiosCombined, alphas, true));
        setStars(sortByAlphas(starsCombined, alphas, false));
        setGlobalScore(prev => (prev ?? sdata.global_score ?? 0));
      } catch (e) {
        console.error('UniversityBox fetch error:', e);
      }
    }

    fetchAll();
    return () => { mounted = false; };
  }, [institutionId, alphas]);

  return (
    <div className="ubox-card">

      {/* --- Icônes en haut‑droite (expand + print) --- */}
      <div className="ubox-actions">
        
        <button
          className="ubox-iconbtn"
          title="Imprimer"
          onClick={() => window.print()}
        >
          <img src="/src/assets/print.svg" alt="print" className='ubox-iconimg' />
        </button>

        <button
          className="ubox-iconbtn"
          title="Agrandir"
          onClick={() => onExpand?.({ id: institutionId, name: institutionName, score: globalScore })}
        >
          <img src="/src/assets/expand.svg" alt="expand" className='ubox-iconimg' />
        </button>
      </div>

      <UniversityHeader name={institutionName} score={globalScore} />

      <div className="ubox-section">
        <h4 className="ubox-title">STARS</h4>
        <h6 className="ubox-desc">The Sustainability Tracking, Assessment & Rating System</h6>
        <div className="ubox-grid">
          {stars.map(m => (
            <ScoreBar
              key={m.id}
              id={m.id}
              score={m.score}
              outOf={m.outOf}
              metricName={m.name}
              description={m.description}
              onClick={onMetricClick}
            />
          ))}
        </div>
      </div>

      <div className="ubox-section">
        <h4 className="ubox-title">Observations</h4>
        <div className="ubox-grid">
          {ratios.map(m => (
            <ScoreBar
              key={m.id}
              id={m.id}
              score={m.score}
              isRatio
              metricName={m.name}
              description={m.description}
              onClick={onMetricClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
