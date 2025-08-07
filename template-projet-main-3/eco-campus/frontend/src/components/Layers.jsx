import React, { useState } from 'react';
import styles from './Layers.module.css';
import axios from 'axios';
import { ScoreDisplayStars } from './ScoreDisplay';
import { AllZonesLayer } from './Zone'; 
import UniversityList from './UniversityList';

export const Layers = ({ mapInstance, onInstitutionSelect, selectedUniversities, setSelectedUniversities }) => {
  const [activeLayers, setActiveLayers] = useState({
    stars: false,
    zones: false,
    universite: false,
  });

  const [starsScores, setStarsScores] = useState(null);

  const handleLayerClick = async (layerType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));

    if (layerType === 'stars') {
      console.log('Afficher ou cacher les étoiles');
      try {
        const res = await axios.get('http://localhost:3001/scores/globalstarsscores');
        setStarsScores(res.data);
      } catch (err) {
        console.error('Erreur stars:', err);
      }
    }

    if (layerType === 'zones') {
      console.log('Afficher ou cacher les zones vertes');

    }

    if (layerType === 'universite') {
      console.log('Afficher ou cacher les universités');
    }
  };

  return (
    <div className={styles.layersBox}>
      <h3 className={styles.title}>Les couches</h3>

      <div className={styles.gridContainer}>
        <button
          className={styles.iconItem}
          onClick={() => handleLayerClick('stars')}
        >
          <img src="/src/assets/stars.svg" alt="Stars" />
          <span>Stars</span>
        </button>

        <button
          className={styles.iconItem}
          onClick={() => handleLayerClick('zones')}
        >
          <img src="/src/assets/zone.svg" alt="Zones" />
          <span>Zones&nbsp;vertes<br />vs.&nbsp;Non-vertes</span>
        </button>

        <button
          className={styles.iconItem}
          onClick={() => handleLayerClick('universite')}
        >
          <img src="/src/assets/universite.svg" alt="Université" />
          <span>Université</span>
        </button>

        <div className={styles.iconItemWrapper}>
          <button className={styles.iconItem} disabled>
            <img src="/src/assets/pavillon.svg" alt="Pavillon" />
            <span>Pavillon</span>
          </button>
          <div className={styles.tooltip}>
            Pour <strong>unlock</strong> le filtre <strong>pavillon</strong>, veuillez sélectionner une <strong>université</strong> dans le filtre université
          </div>
        </div>
      </div>

      {activeLayers.stars && starsScores && (
        <ScoreDisplayStars scores={starsScores} mapInstance={mapInstance} onInstitutionSelect={onInstitutionSelect}/>
      )}

      {activeLayers.zones && (
        <AllZonesLayer map={mapInstance} />
      )}

      {activeLayers.universite && (
        <UniversityList
          selectedUniversities={selectedUniversities}
          setSelectedUniversities={setSelectedUniversities}
        />
      )}
    </div>
  );
};

export default Layers;
