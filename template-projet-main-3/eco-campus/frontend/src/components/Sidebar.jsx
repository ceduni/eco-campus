import React, { useState }  from 'react';
import styles from './Sidebar.module.css';
import { MetricPanel } from './MetricPanel';


const Sidebar = () => {
  const [showMetricPanel, setShowMetricPanel] = useState(false);

  const toggleMetricPanel = () => {
    console.log('Bouton clicke');
    setShowMetricPanel((prev) => !prev); 
  };
  return (
    <div className={styles.sidebar}>
      <button className={styles.control}>
        <img src="src/assets/layers button.svg" alt="Couches"  />
      </button>
      <button className={styles.control} onClick={toggleMetricPanel}>
        <img src="src/assets/filter button.svg" alt="Filter"  />  
      </button>
    </div>
  );
};

export default Sidebar;
