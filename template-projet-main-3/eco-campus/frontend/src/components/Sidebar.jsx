import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.control}>
        <img src="src/assets/layers button.svg" alt="Couches"  />
      </button>
      <button className={styles.control}>
        <img src="src/assets/filter button.svg" alt="Filter"  />
      </button>
    </div>
  );
};

export default Sidebar;
