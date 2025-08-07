import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import styles from './Header.module.css';

const Header = ({ isPanelOpen }) => {
  const location = useLocation();     
  const navigate = useNavigate();     
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const changeLanguage = (lang) => {
    console.log(`Langue changée en: ${lang}`);
    setShowDropdown(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/src/assets/logoECOc.svg" alt="Logo" className={styles.logoIcon} />
        <h1 className={styles.logoText}>eCO-c</h1>
      </div>

      {/* Only this part will shift left when panel is open */}
      <div className={`${styles.toggleButtons} ${isPanelOpen ? styles.panelOpen : ''}`}>
        <button
          className={`${styles.btn} ${location.pathname === '/' ? styles.active : ''}`}
          onClick={() => navigate('/')}
        >
          <img src="/src/assets/maplogo.svg" alt="Carte" />
          <span>CARTE</span>
        </button>
        <button
          className={`${styles.btn} ${location.pathname === '/rapport' ? styles.active : ''}`}
          onClick={() => navigate('/rapport')}
        >
          <img src="/src/assets/rapport.svg" alt="Rapport" />
          <span>RAPPORT</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
