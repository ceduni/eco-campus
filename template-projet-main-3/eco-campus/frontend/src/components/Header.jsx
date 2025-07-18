import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ import du hook de navigation
import styles from './Header.module.css';

const Header = () => {
  const [activeTab, setActiveTab] = useState('carte');
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // ⬅️ initialise le hook

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const changeLanguage = (lang) => {
    console.log(`Langue changée en: ${lang}`);
    setShowDropdown(false);
  };

  // ⬅️ Gère le clic sur un bouton d'onglet
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'carte') {
      navigate('/');
    } else if (tab === 'rapport') {
      navigate('/rapport');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src="/src/assets/logoECOc.svg" alt="Logo" className={styles.logoIcon} />
        <h1 className={styles.logoText}>eCO-c</h1>
      </div>

      <div className={styles.toggleButtons}>
        <button
          className={`${styles.btn} ${activeTab === 'carte' ? styles.active : ''}`}
          onClick={() => handleTabClick('carte')}
        >
          <img src="/src/assets/maplogo.svg" alt="Carte" />
          <span>CARTE</span>
        </button>
        <button
          className={`${styles.btn} ${activeTab === 'rapport' ? styles.active : ''}`}
          onClick={() => handleTabClick('rapport')}
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
