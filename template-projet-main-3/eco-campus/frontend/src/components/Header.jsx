import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('carte');

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/src/assets/logoECOc.svg" alt="Logo" className={styles.logoIcon} />
        <h1 className={styles.logoText}>eCO-c</h1>
      </div>

      <div className={styles.toggleButtons}>
        <button
          className={`${styles.btn} ${activeTab === 'carte' ? styles.active : ''}`}
          onClick={() => setActiveTab('carte')}
        >
          <img src="/src/assets/mapIcon.svg" alt="Carte" />
          <span>CARTE</span>
        </button>
        <button
          className={`${styles.btn} ${activeTab === 'rapport' ? styles.active : ''}`}
          onClick={() => setActiveTab('rapport')}
        >
          <img src="/src/assets/reportIcon.svg" alt="Rapport" />
          <span>RAPPORT</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
