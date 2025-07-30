import React, { useState, useEffect } from 'react';
import styles from './Layers.module.css';
import axios from 'axios';
import { ScoreDisplayStars } from './ScoreDisplay';
import { AllZonesLayer } from './Zone';
import { Marker } from 'react-map-gl'; // Assure-toi que react-map-gl est installé

export const Layers = ({ mapInstance }) => {
  const [activeLayers, setActiveLayers] = useState({
    stars: false,
    zones: false,
    universite: false,
  });

  const [starsScores, setStarsScores] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState([]);

  const handleLayerClick = async (layerType) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerType]: !prev[layerType],
    }));

    if (layerType === 'stars') {
      try {
        const res = await axios.get('http://localhost:3001/scores/globalstarsscores');
        setStarsScores(res.data);
      } catch (err) {
        console.error('Erreur stars:', err);
      }
    }

    if (layerType === 'universite') {
      try {
        const res = await axios.get('http://localhost:3001/institutions');
        setUniversities(res.data);
      } catch (err) {
        console.error('Erreur chargement universités :', err);
      }
    }
  };

  const toggleSelection = (id) => {
    setSelectedUniversities((prev) =>
      prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.layersBox}>
      <h3 className={styles.title}>Les couches</h3>

      <div className={styles.gridContainer}>
        <button className={styles.iconItem} onClick={() => handleLayerClick('stars')}>
          <img src="/src/assets/stars.svg" alt="Stars" />
          <span>Stars</span>
        </button>

        <button className={styles.iconItem} onClick={() => handleLayerClick('zones')}>
          <img src="/src/assets/zone.svg" alt="Zones" />
          <span>Zones&nbsp;vertes<br />vs.&nbsp;Non-vertes</span>
        </button>

        <button className={styles.iconItem} onClick={() => handleLayerClick('universite')}>
          <img src="/src/assets/universite.svg" alt="Université" />
          <span>Université</span>
        </button>

        <div className={styles.iconItemWrapper}>
          <button className={styles.iconItem} disabled>
            <img src="/src/assets/pavillon.svg" alt="Pavillon" />
            <span>Pavillon</span>
          </button>
          <div className={styles.tooltip}>
            Pour <strong>unlock</strong> le filtre <strong>pavillon</strong>, veuillez sélectionner une <strong>université</strong>
          </div>
        </div>
      </div>

      {activeLayers.stars && starsScores && (
        <ScoreDisplayStars scores={starsScores} mapInstance={mapInstance} />
      )}

      {activeLayers.zones && (
        <AllZonesLayer map={mapInstance} />
      )}

      {activeLayers.universite && (
        <div className={styles.uniList}>
          <input
            type="text"
            placeholder="Rechercher..."
            className={styles.searchInput}
            onChange={(e) => {
              const search = e.target.value.toLowerCase();
              setUniversities(prev => prev.map(u => ({
                ...u,
                visible: u.name.toLowerCase().includes(search) || u.id_institution.toLowerCase().includes(search)
              })));
            }}
          />
          <ul className={styles.uniDropdown}>
            {universities.filter(u => u.visible !== false).map((uni) => (
              <li key={uni.id_institution}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUniversities.includes(uni.id_institution)}
                    onChange={() => toggleSelection(uni.id_institution)}
                  />
                  {uni.name} 
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Layers;
