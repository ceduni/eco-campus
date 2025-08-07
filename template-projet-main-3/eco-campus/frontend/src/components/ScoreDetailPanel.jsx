import React from 'react';
import './sharedPanel.css';
import './ScoreDetailPanel.css';

export default function ScoreDetailPanel({ data, onBack, starsMeta, starsScores, ratiosMeta, ratiosScores }) {
  const { id, score, outOf = 5, description, icon } = data;

  const isStarMetric = starsMeta?.some(meta => meta.id_metric === id);
  const mainPercentage = isStarMetric
    ? (score / outOf) * 100
    : score; 

  let mainFillClass = "low";
  if (mainPercentage >= 80) mainFillClass = "high";
  else if (mainPercentage >= 50) mainFillClass = "medium";

  const mainName = isStarMetric
    ? starsMeta?.find(meta => meta.id_metric === id)?.name
    : ratiosMeta?.find(meta => meta.id_ratios === id)?.name;

  const subcriteria = isStarMetric
    ? starsMeta
        .filter(meta => meta.id_parent === id)
        .map(sub => ({
          id: sub.id_metric,
          label: sub.id_metric,
          name: sub.name || '',
          text: sub.description || '',
          score: starsScores?.[sub.id_metric] ?? 0,
          outOf: sub.denominateur ?? 5,
        }))
        .sort((a, b) => {
          const extractNumbers = idStr => {
            const match = idStr.match(/OP(\d+)\.(\d+)/);
            return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 0];
          };
          const [aMain, aSub] = extractNumbers(a.label);
          const [bMain, bSub] = extractNumbers(b.label);
          return aMain - bMain || aSub - bSub;
        })
    : [];

  return (
    <div className="score-detail-wrapper">
      <div className="score-detail-card">
        <div style={{ display: 'inline-block' }}>
          <button className="back-button" onClick={onBack}>← Back</button>
        </div>

        <div className="score-header-centered">
          {icon && <img src={icon} alt={id} className="score-icon-centered" />}
          <h2 className="score-detail-title-centered">{id}: {mainName}</h2>
        </div>

        <div className="score-bar-wrapper">
          <div className="score-bar-container">
            <div
              className={`score-bar-fill ${mainFillClass}`}
              style={{ width: `${mainPercentage}%` }}
            />
          </div>
          <span className="score-value">
            {isStarMetric ? `${score} / ${outOf}` : `${score}`}
          </span>
        </div>

        {description && (
          <div className="main-op-description">
            {description}
          </div>
        )}

        {subcriteria.length > 0 && (
          <div className="subcriteria-section">
            {subcriteria.map((sub, index) => {
              const percent = (sub.score / sub.outOf) * 100;
              let fillClass = "low";
              if (percent >= 80) fillClass = "high";
              else if (percent >= 50) fillClass = "medium";

              return (
                <div key={index} className="subcriterion">
                  <div className="subcriterion-header">
                    <span className="subcriterion-label">{sub.label}: {sub.name}</span>
                  </div>

                  <div className="score-bar-wrapper">
                    <div className="score-bar-container">
                      <div
                        className={`score-bar-fill ${fillClass}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="sub-score-value">{sub.score} / {sub.outOf}</span>
                  </div>

                  <div className="subcriterion-description">
                    {sub.text}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
