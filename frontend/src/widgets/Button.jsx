import React from 'react';
import './Button.css'

export function CustomButton({ text = "Cliquer", onClick }) {
  return (
    <button className="btn" onClick={onClick || (() => alert("Bouton cliqué !"))}>
      {text}
    </button>
  );
}


