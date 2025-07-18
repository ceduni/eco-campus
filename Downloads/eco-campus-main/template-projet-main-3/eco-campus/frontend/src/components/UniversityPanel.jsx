import React from "react";
import "./UniversityPanel.css";
import ScoreWidget from "../widgets/ScoreWidget";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; 
import './sharedPanel.css';

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

function OpScore({ id, score, outOf, description, icon, subcriteria, onClick }) {
  const percentage = (score / outOf) * 100;
  let fillClass = "low";
  if (percentage >= 80) fillClass = "high";
  else if (percentage >= 50) fillClass = "medium";

  return (
    <div className="score-box op" onClick={() => onClick({ id, score, outOf, description, icon, subcriteria })}>
      <div className="score-id" data-tooltip-id={`tooltip-${id}`} data-tooltip-content={description}>
        {id}
      </div>
      <Tooltip id={`tooltip-${id}`} place="top" effect="solid" />
      <div className="score-bar-container">
        <div className={`score-bar-fill ${fillClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="score-value">{score} / {outOf}</div>
    </div>
  );
}

function RatioScore({ id, score, outOf, description, onClick }) {
  const percentage = (score / outOf) * 100;
  let fillClass = "low";
  if (percentage >= 80) fillClass = "high";
  else if (percentage >= 50) fillClass = "medium";

  return (
    <div className="score-box ratio" onClick={() => onClick({ id, score, outOf, description })}>
      <div className="score-id" data-tooltip-id={`tooltip-${id}`} data-tooltip-content={description}>
        {id}
      </div>
      <Tooltip id={`tooltip-${id}`} place="top" effect="solid" />
      <div className="score-bar-container">
        <div className={`score-bar-fill ${fillClass}`} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className="score-value">{score} / {outOf}</div>
    </div>
  );
}

function OpScoreGrid({ onClick }) {
  const opScores = [
    {
  id: "OP1",
  score: 3,
  outOf: 5,
  description: "Building design and construction",
  icon: "/icons/icon-op1.svg",
  subcriteria: [
    {
      label: "OP 1.1",
      score: 3,
      outOf: 5,
      text: "Percentage of new floor area designed and constructed to green building standards.\n\nThe green building standard: It addresses energy, indoor environmental quality (IEQ), material/waste, transportation, water and the ecological aspects of the site."
    }
  ]
  },

    {
      id: "OP2",
      score: 3,
      outOf: 5,
      description: "Exploitation et entretien des bâtiments",
      icon: "/icons/icon-op2.svg",
      subcriteria: [
        { label: "OP 2.1", text: "Use of green cleaning products" },
        { label: "OP 2.2", text: "Maintenance of efficient systems" }
      ]
    },
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
    { id: "OP14", score: 3, outOf: 5, description: "Répartition modale des trajets domicile-travail" },
    { id: "OP15", score: 3, outOf: 5, description: "Voyages aériens" }
    
  ];

  return (
    <div className="score-grid">
      {opScores.map((item, index) => (
        <OpScore key={index} {...item} onClick={onClick} />
      ))}
    </div>
  );
}

function RatioScoreGrid({ onClick }) {
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
        <RatioScore key={index} {...item} onClick={onClick} />
      ))}
    </div>
  );
}

export default function UniversityPanel({ onScoreClick }) {
  return (
    <div className="panel-container">
      <div className="university-panel-scrollable">
        <div className="university-panel">
          <UniversityHeader />
          <div className="score-section">
            <h4 className="score-section-title">STARS :</h4>
            <h6 className="score-section-description">
              The Sustainability Tracking, Assessment & Rating System
            </h6>
            <OpScoreGrid onClick={onScoreClick} />
          </div>
          <div className="score-section">
            <h4 className="score-section-title">OBSERVATIONS</h4>
            <RatioScoreGrid onClick={onScoreClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
