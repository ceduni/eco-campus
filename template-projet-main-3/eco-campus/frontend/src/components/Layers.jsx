import React from 'react';
import styles from './Layers.module.css';

const Layers = () => {
  return (
    <div className={styles.layersBox}>
      <h3 className={styles.title}>Les couches</h3>
      <div className={styles.gridContainer}>
        <button className={styles.iconItem}>
          <img src="/src/assets/stars.svg" alt="Stars" />
          <span>Stars</span>
        </button>
        <button className={styles.iconItem}>
          <img src="/src/assets/zone.svg" alt="Zones" />
          <span>Zones&nbsp;vertes<br />vs.&nbsp;Non-vertes</span>

        </button>
        <button className={styles.iconItem}>
          <img src="/src/assets/universite.svg" alt="Université" />
          <span>Université</span>
        </button>
        <button className={styles.iconItem} disabled>
          <img src="/src/assets/pavillon.svg" alt="Pavillon" />
          <span>Pavillon</span>
        </button>
      </div>
    </div>
  );
};

export default Layers;
