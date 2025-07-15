import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { MetricPanel } from './MetricPanel';

const Sidebar = () => {
  const [showMetricPanel, setShowMetricPanel] = useState(false);

  return (
    <div className={styles.sidebar}>
      <button className={styles.control}>
        <img src="src/assets/layers button.svg" alt="Couches" />
      </button>

      <button
        className={styles.control}
        onClick={() => setShowMetricPanel((prev) => !prev)}
      >
        <img src="src/assets/filter button.svg" alt="Filter" />
      </button>

      {showMetricPanel && <MetricPanel />}
    </div>
  );
};

export default Sidebar;
