import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ScoreWidget from '../widgets/ScoreWidget';
import './ExpandedReport.css'; 

function tier(score) {
  if (score >= 300) return 'gold';
  if (score >= 200) return 'silver';
  if (score >= 100) return 'bronze';
  return 'participant';
}

export default function ExpandedUniversityBox({
  institutionId,
  institutionName,
  initialGlobalScore,
  alphas,
  onBack,
}) {
  const [globalScore, setGlobalScore] = useState(initialGlobalScore ?? 0);
  const [starsMeta, setStarsMeta] = useState([]);
  const [ratiosMeta, setRatiosMeta] = useState([]);
  const [scoresById, setScoresById] = useState({ stars_values: {}, ratios_values: {} });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [ratiosRes, starsRes, scoresRes] = await Promise.all([
          axios.get('http://localhost:3001/metrics/ratios'),
          axios.get('http://localhost:3001/metrics/stars'),
          axios.post('http://localhost:3001/scores/scoresById', { id_institution: institutionId }),
        ]);
        if (!mounted) return;

        setRatiosMeta(ratiosRes.data || []);
        setStarsMeta(starsRes.data || []);
        setScoresById(scoresRes.data || { stars_values: {}, ratios_values: {} });
        setGlobalScore(prev => (prev ?? scoresRes.data?.global_score ?? 0));
      } catch (e) {
        console.error('ExpandedUniversityBox fetch error:', e);
      }
    })();
    return () => { mounted = false; };
  }, [institutionId]);

  
  const starsTop = starsMeta
    .filter(m => m.id_parent === null)
    .filter(m => !alphas?.coeff_op || alphas.coeff_op[m.id_metric] !== 0)
    .map(m => ({
      id: m.id_metric,
      name: m.name,
      description: m.description,
      outOf: m.denominateur ?? 5,
      score: scoresById.stars_values?.[m.id_metric] ?? 0,
    }));

  
  const ratios = ratiosMeta
    .filter(m => !alphas?.coeff_ratio || alphas.coeff_ratio[m.id_ratios] !== 0)
    .map(m => ({
      id: m.id_ratios,
      name: m.name,
      description: m.description,
      score: scoresById.ratios_values?.[m.id_ratios] ?? 0,
    }));

  return (
    <section className="er-paper">
      {/* Ligne retour + logos (optionnel) */}
      <div className="er-toprow">
        <button className="er-back" onClick={onBack} aria-label="Revenir">
          ← Back
        </button>
      </div>

      {/* Titre + médaille */}
      <header className="er-header">
        <h1 className="er-title">{institutionName}</h1>
        <div className="er-medal">
          <ScoreWidget score={globalScore ?? 0} label={institutionName} tier={tier(globalScore ?? 0)} />
        </div>
      </header>

      {/* Intro STARS */}
      <section className="er-intro">
        <h2 className="er-h2">Score écologique des universités</h2>
      </section>

      {/* Paragraphe d’intro (extrait style maquette) */}
      <p className="er-paragraph">
        This credit recognizes institutions that have incorporated sustainability requirements and
        standards into the design and construction of their buildings
      </p>

      {/* --------- Bloc STARS (OP) ---------- */}
      {starsTop.map(op => (
        <article key={op.id} className="er-block">
          <div className="er-opline">
            <a className="er-opid" href="#" onClick={(e)=>e.preventDefault()}>{op.id}</a>
            <span className="er-opscore">{op.score} / {op.outOf}</span>
          </div>

          <h3 className="er-opname">{op.name}</h3>

          {op.description && (
            <div className="er-description" dangerouslySetInnerHTML={{ __html: op.description }} />
          )}

          {/* Sous‑critères de cet OP */}
          <div className="er-sublist">
            {starsMeta
              .filter(s => s.id_parent === op.id)
              .sort((a, b) => {
                const toPair = (t) => (String(t).match(/OP(\d+)\.(\d+)/) || [0,0,0]).slice(1).map(n=>parseInt(n||0));
                const [am, as] = toPair(a.id_metric); const [bm, bs] = toPair(b.id_metric);
                return am - bm || as - bs;
              })
              .map(sub => {
                const val = scoresById.stars_values?.[sub.id_metric] ?? 0;
                const out = sub.denominateur ?? 5;
                return (
                  <div key={sub.id_metric} className="er-subitem">
                    <div className="er-subhead">
                      <span className="er-subid">{sub.id_metric}</span>
                      <span className="er-subscore">{val} / {out}</span>
                    </div>
                    <div className="er-subname">{sub.name}</div>
                    {sub.description && (
                      <div className="er-subdesc" dangerouslySetInnerHTML={{ __html: sub.description }} />
                    )}
                  </div>
                );
              })}
          </div>
        </article>
      ))}

      {/* --------- Bloc Observations ---------- */}
      {ratios.length > 0 && (
        <>
          <h2 className="er-h2" style={{marginTop: 28}}>Observations</h2>
          {ratios.map(r => (
            <article key={r.id} className="er-block">
              <div className="er-opline">
                <span className="er-opid">{r.id}</span>
                <span className="er-opscore">{r.score}</span>
              </div>
              <h3 className="er-opname">{r.name}</h3>
              {r.description && (
                <div className="er-description" dangerouslySetInnerHTML={{ __html: r.description }} />
              )}
            </article>
          ))}
        </>
      )}
    </section>
  );
}
