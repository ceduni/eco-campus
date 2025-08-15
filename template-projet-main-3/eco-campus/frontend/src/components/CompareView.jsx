import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './CompareView.css';

/**
 * CompareView
 * - Compare exactement 2 universités (ids[0], ids[1])
 * - Réutilise la même API et les alphas que le rapport
 */
export default function CompareView({ ids = [], universities = [], alphas, onBack }) {
  const [leftId, rightId] = ids;
  const [leftData, setLeftData] = useState(null);
  const [rightData, setRightData] = useState(null);
  const [loading, setLoading] = useState(true);

  const idToName = useMemo(() => {
    const m = {};
    universities.forEach(u => { m[u.id_institution] = u.name || u.id_institution; });
    return m;
  }, [universities]);

  useEffect(() => {
    let mounted = true;

    async function loadOne(id) {
      const [ratiosRes, starsRes, scoresRes] = await Promise.all([
        axios.get('http://localhost:3001/metrics/ratios'),
        axios.get('http://localhost:3001/metrics/stars'),
        axios.post('http://localhost:3001/scores/scoresById', { id_institution: id }),
      ]);

      const ratioMeta = ratiosRes.data || [];
      const starsMeta = starsRes.data || [];
      const sdata = scoresRes.data || {};

      const ratios = ratioMeta
        .filter(m => !alphas?.coeff_ratio || alphas.coeff_ratio[m.id_ratios] !== 0)
        .map(m => ({
          id: m.id_ratios,
          name: m.name,
          description: m.description,
          score: sdata.ratios_values?.[m.id_ratios] ?? 0,
        }));

      const stars = starsMeta
        .filter(m => m.id_parent === null)
        .filter(m => !alphas?.coeff_op || alphas.coeff_op[m.id_metric] !== 0)
        .map(m => ({
          id: m.id_metric,
          name: m.name,
          description: m.description,
          score: sdata.stars_values?.[m.id_metric] ?? 0,
          outOf: m.denominateur,
        }));

      return {
        globalScore: sdata.global_score ?? 0,
        stars,
        ratios,
      };
    }

    (async () => {
      setLoading(true);
      try {
        const [a, b] = await Promise.all([
          leftId ? loadOne(leftId) : Promise.resolve(null),
          rightId ? loadOne(rightId) : Promise.resolve(null),
        ]);
        if (!mounted) return;
        setLeftData(a);
        setRightData(b);
      } catch (e) {
        console.error('CompareView load error:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [leftId, rightId, alphas]);

  if (loading) return <div className="cmp-wrap"><p>Chargement…</p></div>;

  if (!(leftId && rightId)) {
    return (
      <div className="cmp-wrap">
        <button className="cmp-back" onClick={onBack}>Retour</button>
        <div className="cmp-hint">
          Sélectionnez <strong>deux universités</strong> (via ta sélection habituelle), puis relance la comparaison.
        </div>
      </div>
    );
  }

  const renderCol = (id, data) => {
    const name = idToName[id] || id;
    return (
      <div className="cmp-col">
        <div className="cmp-header">
          <h3 className="cmp-name">{name}</h3>
          <div className="cmp-badge">{Math.round(data?.globalScore ?? 0)}</div>
        </div>

        <div className="cmp-section">
          <h4 className="cmp-title">STARS</h4>
          <div className="cmp-list">
            {data?.stars?.map(op => {
              const pct = op.outOf ? (op.score / op.outOf) * 100 : 0;
              const cls = pct >= 80 ? 'high' : pct >= 50 ? 'med' : 'low';
              return (
                <div key={op.id} className="cmp-item">
                  <div className="cmp-item-row">
                    <span className="cmp-id">{op.id}</span>
                    <div className="cmp-bar"><div className={`fill ${cls}`} style={{ width: `${pct}%` }} /></div>
                    <span className="cmp-val">{op.score} / {op.outOf}</span>
                  </div>
                  <div className="cmp-item-name">{op.name}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="cmp-section">
          <h4 className="cmp-title">Observations</h4>
          <div className="cmp-list">
            {data?.ratios?.map(r => {
              const pct = r.score ?? 0;
              const cls = pct >= 80 ? 'high' : pct >= 50 ? 'med' : 'low';
              return (
                <div key={r.id} className="cmp-item">
                  <div className="cmp-item-row">
                    <span className="cmp-id">{r.id}</span>
                    <div className="cmp-bar"><div className={`fill ${cls}`} style={{ width: `${pct}%` }} /></div>
                    <span className="cmp-val">{r.score}</span>
                  </div>
                  <div className="cmp-item-name">{r.name}</div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="cmp-wrap">
      <div className="cmp-top">
        <button className="cmp-back" onClick={onBack}>Retour</button>
      </div>
      <h2 className="cmp-main-title">Comparaison des universités</h2>

      <div className="cmp-grid">
        {renderCol(leftId, leftData)}
        {renderCol(rightId, rightData)}
      </div>
    </div>
  );
}
