import React from 'react';
const UniversityBox = ({ uni, name, logo, color, ops, alphas, opNames }) => {
  return (
    <div key={uni.id_institution} className="uni-box">
      <div className="uni-header">
        <div className="uni-logo-name">
          <img src={logo} alt="logo" className="uni-logo" />
          <h3>{name}</h3>
        </div>
        <div className="icons">
          <img src="/src/assets/print.svg" alt="Print" className="icon" />
          <img src="/src/assets/expand.svg" alt="Expand" className="icon" />
        </div>
      </div>

      <span className={`score-badge ${color}`}>{uni.score}</span>

      <div className="op-grid">
        {Object.entries(ops)
          .filter(([opId]) => opId in alphas.coeff_op)
          .map(([opId, value]) => (
            <div key={opId} className="op-item">
              <div className="op-top">
                <img src="/src/assets/op-icon.svg" alt="OP" className="op-icon" />
                <span>{opNames[opId] || opId}</span>
              </div>
              <div className="progress-section">
                <progress value={value} max="5" />
                <span>{value}/5</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UniversityBox;
