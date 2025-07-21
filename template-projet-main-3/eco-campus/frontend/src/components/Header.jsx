import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ Ajouté
import styles from './Header.module.css';

const Header = () => {
  const location = useLocation();     // ✅ Pour détecter la page active
  const navigate = useNavigate();     // ✅ Pour rediriger
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

      <div className={styles.toggleButtons}>
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

      <div className={styles.languageSwitcher}>
        <button className={styles.languageButton} onClick={toggleDropdown}>
          <img src="/src/assets/france.svg" alt="Langue" />
        </button>
        {showDropdown && (
          <div className={styles.dropdown}>
            <div onClick={() => changeLanguage('fr')}>Français</div>
            <div onClick={() => changeLanguage('en')}>English</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
