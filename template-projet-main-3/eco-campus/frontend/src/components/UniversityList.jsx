import React, { useState, useEffect } from 'react';
import styles from './Layers.module.css';
import axios from 'axios';

const UniversityList = ({ selectedUniversities, setSelectedUniversities }) => {
  const [universities, setUniversities] = useState([]);

  // Charger la liste depuis la base
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await axios.get('http://localhost:3001/institutions');
        setUniversities(res.data);
      } catch (err) {
        console.error('Erreur chargement universités :', err);
      }
    };
    fetchUniversities();
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('selectedUniversities', JSON.stringify(selectedUniversities));
  }, [selectedUniversities]);

  // Gestion recherche
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    setUniversities((prev) =>
      prev.map((u) => ({
        ...u,
        visible:
          u.name.toLowerCase().includes(search) ||
          u.id_institution.toLowerCase().includes(search),
      }))
    );
  };

  // Toggle sélection
  const toggleSelection = (id) => {
    setSelectedUniversities((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  return (
    <div className={styles.uniList}>
      <input
        type="text"
        placeholder="Rechercher"
        className={styles.searchInput}
        onChange={handleSearch}
      />
      <ul className={styles.uniDropdown}>
        {universities.filter((u) => u.visible !== false).map((uni) => (
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
  );
};

export default UniversityList;