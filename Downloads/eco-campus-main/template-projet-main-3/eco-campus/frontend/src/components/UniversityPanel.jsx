import React from "react";
import "./UniversityPanel.css";
import ScoreWidget from "../widgets/ScoreWidget";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 


function UniversityHeader() {
  return (
    <div className="university-header">
      <div className="university-name">Université de Montréal</div>
      <div className="university-medal">
        <ScoreWidget score={322} label="Université de Montréal" tier="gold" />
      </div>
    </div>
  );
}

// --- Individual OP Score Box ---
function OpScore({ id, score, outOf, description }) {
  const percentage = (score / outOf) * 100;
  let fillClass = "low";
  if (percentage >= 80) fillClass = "high";
  else if (percentage >= 50) fillClass = "medium";

  return (
    <div className="score-box op">
      <div
        className="score-id"
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={description}
      >
        {id}
      </div>
      <Tooltip id={`tooltip-${id}`} place="top" effect="solid" />
      <div className="score-bar-container">
        <div
          className={`score-bar-fill ${fillClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="score-value">{score} / {outOf}</div>
    </div>
  );
}

// --- Individual Ratio Score Box ---
function RatioScore({ id, score, outOf, description }) {
  const percentage = (score / outOf) * 100;
  let fillClass = "low";
  if (percentage >= 80) fillClass = "high";
  else if (percentage >= 50) fillClass = "medium";

  return (
    <div className="score-box ratio">
    <div
        className="score-id"
        data-tooltip-id={`tooltip-${id}`}
        data-tooltip-content={description}
      >
        {id}
      </div>
      <Tooltip id={`tooltip-${id}`} place="top" effect="solid" />
      <div className="score-bar-container">
        <div
          className={`score-bar-fill ${fillClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="score-value">{score} / {outOf}</div>
    </div>
  );
}

// --- Grid of OP Score Boxes ---
function OpScoreGrid() {
  const opScores = [
    { id: "OP1", score: 4, outOf: 5, description: "Conception et construction des batîments" },
    { id: "OP2", score: 3, outOf: 5, description: "Exploitation et entretien des batîments " },
    { id: "OP3", score: 2, outOf: 5, description: "Utilisation d'eau" },
    { id: "OP4", score: 5, outOf: 5, description: "Terrains gérés de manière écologique" },
    { id: "OP5", score: 1, outOf: 5, description: "Consommation d'énergie" },
    { id: "OP6", score: 5, outOf: 5, description: "Émissions de gaz à effet de serre" },
    { id: "OP7", score: 3, outOf: 5, description: "Approvisionnement en services de restauration" },
    { id: "OP8", score: 5, outOf: 5, description: "Récupération alimentaire" },
    { id: "OP9", score: 1, outOf: 5, description: "Systèmes d'approvisionnement durable" },
    { id: "OP10", score: 5, outOf: 5, description: "Biens achetés" },
    { id: "OP11", score: 2, outOf: 5, description: "Gestion du matériel" },
    { id: "OP12", score: 0, outOf: 5, description: "Production et valorisation des déchets" },
    { id: "OP13", score: 5, outOf: 5, description: "Flotte de véhicules" },
    { id: "OP14", score: 3, outOf: 5, description: "Répartition modale des trajets domocile-travail" },
    { id: "OP15", score: 3, outOf: 5, description: "Voyage aériens" }
  ];

  return (
    <div className="score-grid">
      {opScores.map((item, index) => (
        <OpScore key={index} {...item} />
      ))}
    </div>
  );
}

// --- Grid of Ratio Score Boxes ---
function RatioScoreGrid() {
  const mockScores = [
    { id: "R1", score: 4, outOf: 5, description: ".." },
    { id: "R2", score: 3, outOf: 5, description: ".." },
    { id: "R3", score: 2, outOf: 5, description: ".." },
    { id: "R4", score: 5, outOf: 5, description: ".." },
    { id: "R5", score: 5, outOf: 5, description: ".." }
  ];

  return (
    <div className="score-grid">
      {mockScores.map((item, index) => (
        <RatioScore key={index} {...item} />
      ))}
    </div>
  );
}

// --- Main Panel Component ---
export default function UniversityPanel() {
  return (
    <div className="panel-container">
     <div className="university-panel-scrollable">
      <div className="university-panel">
        <UniversityHeader />
        <div className="score-section">
         <h4 className="score-section-title">STARS : </h4>
         <h6 className="score-section-description">
               The Sustainability Tracking, Assessment & Rating System
        </h6>
          <OpScoreGrid />
        </div>

        <div className="score-section">
          <h4 className="score-section-title">OBSERVATIONS</h4>
          <RatioScoreGrid />
        </div>
      </div>
     </div>
    </div>
  );
}
