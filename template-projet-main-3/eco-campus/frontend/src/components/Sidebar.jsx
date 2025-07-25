import React, { useState } from 'react';
import styles from './Sidebar.module.css';

import { MetricPanel } from './MetricPanel';
import {Layers} from './Layers';


const Sidebar = ({ mapInstance }) => {
  const [showMetricPanel, setShowMetricPanel] = useState(false);
  const [showLayers, setShowLayers] = useState(false);

  return (
    <div className={styles.sidebar}>
      <button className={styles.control}
      onClick={() => setShowLayers((prev) => !prev)}>
        <img src="src/assets/layers button.svg" alt="Couches" />
      </button>
       {showLayers && <Layers mapInstance={mapInstance} />}
      <button
        className={styles.control}
        onClick={() => setShowMetricPanel((prev) => !prev)}
      >
        <img src="src/assets/filter button.svg" alt="Filter" />
      </button>

      {showMetricPanel && <MetricPanel mapInstance={mapInstance} />}
    </div>

  );
};

export default Sidebar;

