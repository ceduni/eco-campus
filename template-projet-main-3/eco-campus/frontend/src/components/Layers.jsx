import React from 'react';
import styles from './Layers.module.css';

const Layers = () => {
  return (
    <div className={styles.layersBox}>
      <h3 className={styles.title}>Les couches</h3>
      <div className={styles.iconsGrid}>
        <div className={styles.iconItem}>
          <img src="/src/assets/stars.svg" alt="Stars" />
          <span>Stars</span>
        </div>
        <div className={styles.iconItem}>
          <img src="/src/assets/zones.svg" alt="Zones vertes" />
          <span>Zones vertes vs. Non-vertes</span>
        </div>
        <div className={styles.iconItem}>
          <img src="/src/assets/universite.svg" alt="Université" />
          <span>Université</span>
        </div>
        <div className={styles.iconItem}>
          <img src="/src/assets/pavillon.svg" alt="Pavillon" />
          <span>Pavillon</span>
        </div>
      </div>
    </div>
  );
};

export default Layers;
