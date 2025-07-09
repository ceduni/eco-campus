import React from 'react';
import styles from './Markers.module.css';

/**
 * Marqueurs (pins) positionnés en absolu, en pourcentages.
 * Inspiré du rendu statique généré par PXCode.
 */
const markers = [
  { left: '39.11%', top: '36.42%' },
  { left: '23.28%', top: '44.09%' },
  { left: '16.93%', top: '57.33%' },
  { left: '39.09%', top: '60.90%' },
  { left: '31.81%', top: '64.46%' },
];

const Markers = () => {
  return (
    <div className={styles.mapPins}>
      {markers.map((pos, index) => (
        <img
          key={index}
          src="/images/pin.png"
          alt="Map pin"
          className={styles.pin}
          style={{ left: pos.left, top: pos.top, width: '4.63%' }}
        />
      ))}
    </div>
  );
};

export default Markers;
