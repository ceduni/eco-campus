import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import Layers from './Layers';

const Sidebar = () => {
  const [showLayers, setShowLayers] = useState(false);

  return (
    <>
      <div className={styles.sidebar}>
        <button className={styles.control} onClick={() => setShowLayers(prev => !prev)}>
          <img src="src/assets/layers button.svg" alt="Couches" />
        </button>
        <button className={styles.control}>
          <img src="src/assets/filter button.svg" alt="Filter" />
        </button>
      </div>
      {showLayers && <Layers />}
    </>
  );
};

export default Sidebar;

