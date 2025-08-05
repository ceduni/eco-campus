import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UniversityBarChart from '../components/UniversityBarChart';
import UniversityBox from '../components/UniversityBox'; // ← Ajouté
import './ReportPage.css';

const ReportPage = () => {
  const [scores, setScores] = useState([]);
  const [details, setDetails] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alphas, setAlphas] = useState({ coeff_op: {}, coeff_ratio: {} });
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [opNames, setOpNames] = useState({});

  // 🔁 Récupérer les universités sélectionnées depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem('selectedUniversities');
    setSelectedUnis(stored ? JSON.parse(stored) : []);
  }, []);

  // 📦 Charger les scores, détails et noms d’universités
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const stored = localStorage.getItem('alphas');
        const parsed = stored ? JSON.parse(stored) : { coeff_op: {}, coeff_ratio: {} };
        setAlphas(parsed);

        const [scoreRes, detailsRes, uniRes] = await Promise.all([
          axios.post('http://localhost:3001/scores/globalscores', parsed),
          axios.get('http://localhost:3001/scores/globalstarsscores'),
          axios.get('http://localhost:3001/institutions'),
        ]);

        setScores(scoreRes.data);
        setDetails(detailsRes.data);
        setUniversities(uniRes.data);
      } catch (err) {
        console.error('Erreur chargement des données :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 🔠 Charger les noms des OP
  useEffect(() => {
    const fetchOPNames = async () => {
      try {
        const res = await axios.get('http://localhost:3001/metrics/stars');
        const nameMap = {};
        res.data.forEach((op) => {
          nameMap[op.id_metric] = op.name;
        });
        setOpNames(nameMap);
      } catch (err) {
        console.error('Erreur chargement noms OP :', err);
      }
    };

    fetchOPNames();
  }, []);

  // 🔍 Aides
  const getUniversityName = (id) => {
    const uni = universities.find((u) => u.id_institution === id);
    return uni?.name || id;
  };

  const getUniLogo = (id) => {
    if (id.toLowerCase().includes('montreal')) return '/src/assets/udem.png';
    if (id.toLowerCase().includes('concordia')) return '/src/assets/concordia.png';
    return '/src/assets/university.png';
  };

  const getUniColor = (id) => {
    if (id.toLowerCase().includes('montreal')) return 'gold';
    return 'gray';
  };

  const getUniOPs = (uniId) => {
    const data = details.find((d) => d.id_institution === uniId);
    return data?.stars_values || {};
  };

  // 🎯 Appliquer le filtre de sélection
  const filteredScores = scores.filter((uni) =>
    selectedUnis.length === 0 ? true : selectedUnis.includes(uni.id_institution)
  );

  if (loading) return <p>Chargement des scores...</p>;

  return (
    <div className="report-container">
      <Header />

      <div className="report-header">
        <h2 className="report-title">Score écologique des universités</h2>
        <button className="compare-button">Comparaison</button>
      </div>

      <div className="chart-section">
        <UniversityBarChart scores={filteredScores} universities={universities} />
      </div>

      {filteredScores.map((uni) => {
        const ops = getUniOPs(uni.id_institution);
        const name = getUniversityName(uni.id_institution);
        const logo = getUniLogo(uni.id_institution);
        const color = getUniColor(uni.id_institution);

        return (
          <UniversityBox
            key={uni.id_institution}
            uni={uni}
            name={name}
            logo={logo}
            color={color}
            ops={ops}
            alphas={alphas}
            opNames={opNames}
          />
        );
      })}
    </div>
  );
};

export default ReportPage;
