import React, { useState } from 'react';

export function Score({ name, value }) {
  return (
    <div className='ScoreContainer'>
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export function ScoreDisplay({ scores }) {
  if (!scores || scores.length === 0) return null;

  return (
    <div className="score-list">
      {scores.map((entry) => (
        <Score
          key={entry.id_institution}
          name={`Institution ${entry.id_institution}`}
          value={entry.score}
        />
      ))}
    </div>
  );
}