import React from "react";
import "./ScoreWidget.css";


export default function ScoreCircle({ score, label, tier = "gold" }) {
  return (
    <div className="score-circle-wrapper">
      {/* Curved text */}
      <svg className="score-circle-svg" viewBox="0 0 100 100">
        <defs>
          <path
            id="textPath"
            d="M 10,55 A 40,40 0 0 1 90,55"
            fill="none"
          />
        </defs>
        <text className="circle-label-text">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      </svg>

      {/* Outer white ring with stroke */}
      <div className="circle-outer">
        {/* Inner colored circle */}
        <div className={`circle-inner ${tier}`}>
          <div className="circle-number">{score}</div>
        </div>
      </div>
    </div>
  );
}
