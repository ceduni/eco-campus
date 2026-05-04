import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UniversityBarChart from '../components/UniversityBarChart';
import './ReportPage.css';

const ReportPage = () => {
  const [scores, setScores] = useState([]);
  const [details, setDetails] = useState([]); // Pour OP/valeurs par université
  const [loading, setLoading] = useState(true);
  const [alphas, setAlphas] = useState({ coeff_op: {}, coeff_ratio: {} });

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const stored = localStorage.getItem('alphas');
        const parsed = stored ? JSON.parse(stored) : { coeff_op: {}, coeff_ratio: {} };
        setAlphas(parsed);

        const res = await axios.post('http://localhost:3001/scores/globalscores', parsed);
        const resDetails = await axios.get('http://localhost:3001/scores/globalstarsscores');
        setScores(res.data); // [{ id_institution, score }]
        setDetails(resDetails.data); // [{ id_institution, stars_values }]
      } catch (err) {
        console.error('Erreur chargement scores rapport :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const [opNames, setOpNames] = useState({});

  useEffect(() => {
    const fetchOPNames = async () => {
      try {
        const res = await axios.get('http://localhost:3001/metrics/stars');
        const nameMap = {};
        res.data.forEach((op) => {
          nameMap[op.id_metric] = op.name; // ou op.label selon ta structure
        });
        setOpNames(nameMap);
      } catch (err) {
        console.error('Erreur chargement noms OP :', err);
      }
    };

    fetchOPNames();
  }, []);


  if (loading) return <p>Chargement des scores...</p>;

  const getUniLogo = (name) => {
    if (name.toLowerCase().includes('montreal')) return '/src/assets/udem.png';
    if (name.toLowerCase().includes('concordia')) return '/src/assets/concordia.png';
    return '/src/assets/university.png';
  };

  const getUniColor = (name) => {
    if (name.toLowerCase().includes('montreal')) return 'gold';
    return 'gray';
  };

  const getUniOPs = (uniId) => {
    const data = details.find((d) => d.id_institution === uniId);
    return data?.stars_values || {};
  };

  return (
    <div className="report-container">
      <Header />

      <div className="report-header">
        <h2 className="report-title">Score écologique des universités</h2>
        <button className="compare-button">Comparaison</button>
      </div>

      <div className="chart-section">
        <UniversityBarChart scores={scores} />
      </div>

      {scores.map((uni) => {
        const ops = getUniOPs(uni.id_institution);

        return (
          <div key={uni.id_institution} className="uni-box">
            <div className="uni-header">
              <div className="uni-logo-name">
                <img src={getUniLogo(uni.id_institution)} alt="logo" className="uni-logo" />
                <h3>{uni.id_institution}</h3>
              </div>
              <div className="icons">
                <img src="/src/assets/print.svg" alt="Print" className="icon" />
                <img src="/src/assets/expand.svg" alt="Expand" className="icon" />
              </div>
            </div>

            <span className={`score-badge ${getUniColor(uni.id_institution)}`}>
              {uni.score}
            </span>

            <div className="op-grid">
              {Object.entries(ops)
                .filter(([opId]) => opId in alphas.coeff_op)
                .map(([opId, value], i) => (
                  <div key={opId} className="op-item">
                    <div className="op-top">
                      <img src="/src/assets/op-icon.svg" alt="OP" className="op-icon" />
                      <span>{opId} : Nom OP à récupérer</span>
                    </div>
                    <div className="progress-section">
                      <progress value={value} max="5" />
                      <span>{value}/5</span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportPage;
