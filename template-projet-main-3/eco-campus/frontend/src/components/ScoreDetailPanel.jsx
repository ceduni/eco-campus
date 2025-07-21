import React from 'react';
import './sharedPanel.css';
import './ScoreDetailPanel.css';

export default function ScoreDetailPanel({ data, onBack }) {
  const { id, score, outOf, description, icon, subcriteria } = data;

  const mainPercentage = (score / outOf) * 100;
  let mainFillClass = "low";
  if (mainPercentage >= 80) mainFillClass = "high";
  else if (mainPercentage >= 50) mainFillClass = "medium";

  return (
    <div className="score-detail-wrapper">
      <div className="score-detail-card">
        <button className="back-button" onClick={onBack}>← Back</button>

        <div className="score-header">
          {icon && <img src={icon} alt={id} className="score-icon" />}
          <h2>{id}: {description}</h2>
        </div>

        <div className="score-bar-container">
          <div className={`score-bar-fill ${mainFillClass}`} style={{ width: `${mainPercentage}%` }}></div>
        </div>
        <p className="score-value">{score} / {outOf}</p>

        {/* Main OP description I need to add all the other ones */}
        <div className="main-op-description">
          This credit recognizes institutions that have incorporated sustainability requirements and standards into the design and construction of their buildings
        </div>

        {/* Subcriteria like 1.1,1.2,1.3 */}
        {subcriteria?.length > 0 && (
          <div className="subcriteria-section">
            {subcriteria.map((sub, index) => {
              const percent = (sub.score / sub.outOf) * 100;
              let fillClass = "low";
              if (percent >= 80) fillClass = "high";
              else if (percent >= 50) fillClass = "medium";

              return (
                <div key={index} className="subcriterion">
                  <div className="subcriterion-header">
                    <span className="subcriterion-label">{sub.label}</span> <span className="sub-score-value">{sub.score} / {sub.outOf}</span>
                  </div>
                  <div className="score-bar-container">
                    <div className={`score-bar-fill ${fillClass}`} style={{ width: `${percent}%` }}></div>
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
