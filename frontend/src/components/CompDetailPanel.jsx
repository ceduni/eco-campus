import React from 'react';
import './sharedPanel.css';
import './ScoreDetailPanel.css';

export default function CompareDetailPanel({
  data,
  onBack,
  uniAData,
  uniBData,
  starsMeta,
  ratiosMeta
}) {
  const { id, description } = data;

  const isStarMetric = starsMeta?.[id] !== undefined;
  const metadata = isStarMetric ? starsMeta : ratiosMeta;
  const fullMeta = metadata[id];
  const mainName = fullMeta?.name;

  const subcriteria = isStarMetric
    ? Object.values(starsMeta).filter(meta => meta.id_parent === id)
    : [{
        id_metric: id,
        name: mainName,
        description,
        denominateur: 100  
      }];

  const comparisons = subcriteria.map(sub => {
    const aScore = isStarMetric
      ? uniAData.stars_values?.[sub.id_metric] ?? 0
      : uniAData.ratios_values?.[sub.id_metric] ?? 0;

    const bScore = isStarMetric
      ? uniBData.stars_values?.[sub.id_metric] ?? 0
      : uniBData.ratios_values?.[sub.id_metric] ?? 0;

    const outOf = isStarMetric ? (sub.denominateur || 5) : 100;
    const diff = Math.abs(aScore - bScore);

    const aWins = aScore >= bScore;
    const winner = {
      score: aWins ? aScore : bScore,
      label: aWins ? uniAData.institution_name : uniBData.institution_name,
      logo: aWins ? uniAData.logo : uniBData.logo,
      className: 'high'
    };
    const loser = {
      score: aWins ? bScore : aScore,
      label: aWins ? uniBData.institution_name : uniAData.institution_name,
      logo: aWins ? uniBData.logo : uniAData.logo,
      className: 'low'
    };

    return {
      id: sub.id_metric,
      name: sub.name,
      description: sub.description,
      winner,
      loser,
      outOf,
      diff
    };
  });

  return (
    <div className="score-detail-wrapper">
      <div className="score-detail-card">
        <button className="back-button" onClick={onBack}>← Back</button>

        <div className="score-header-centered">
          <h2 className="score-detail-title-centered">{id}: {mainName}</h2>
        </div>

        {description && (
          <div className="main-op-description">{description}</div>
        )}

        <div className="subcriteria-section">
          {comparisons.map((sub, index) => (
            <div key={index} className="subcriterion">
              <div className="subcriterion-header">
                <span className="subcriterion-label">{sub.id}: {sub.name}</span>
              </div>

              {/* Winner */}
              <div className="score-bar-wrapper">
                <img src={`/logos/${sub.winner.logo}`} alt={sub.winner.label} className="score-logo" />
                <div className="score-bar-container">
                  <div
                    className={`score-bar-fill ${sub.winner.className}`}
                    style={{ width: `${(sub.winner.score / sub.outOf) * 100}%` }}
                  />
                </div>
                <span className="score-value">{sub.winner.score}</span>
              </div>

              {/* Loser */}
              <div className="score-bar-wrapper">
                <img src={`/logos/${sub.loser.logo}`} alt={sub.loser.label} className="score-logo" />
                <div className="score-bar-container">
                  <div
                    className={`score-bar-fill ${sub.loser.className}`}
                    style={{ width: `${(sub.loser.score / sub.outOf) * 100}%` }}
                  />
                </div>
                <span className="score-value">{sub.loser.score}</span>
              </div>

              {/* Difference */}
              <div className="score-bar-wrapper">
                <span className="subcriterion-label">Différence</span>
                <div className="score-bar-container">
                  <div
                    className="score-bar-fill yellow"
                    style={{ width: `${(sub.diff / sub.outOf) * 100}%` }}
                  />
                </div>
                <span className="score-value">{sub.diff}</span>
              </div>

              {sub.description && (
                <div className="subcriterion-description">{sub.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
