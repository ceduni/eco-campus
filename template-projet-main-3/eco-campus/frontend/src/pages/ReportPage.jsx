import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import UniversityBarChart from '../components/UniversityBarChart';
import UniversityBox from '../components/UniversityBox';
import ExpandedUniversityBox from '../components/ExpandedUniversityBox';
import './ReportPage.css';

const ReportPage = () => {
  const [scores, setScores] = useState([]);                // [{ id_institution, score }]
  const [universities, setUniversities] = useState([]);    // [{ id_institution, name, ... }]
  const [loading, setLoading] = useState(true);
  const [alphas, setAlphas] = useState({ coeff_op: {}, coeff_ratio: {} });
  const [selectedUnis, setSelectedUnis] = useState([]);
  const [expandedUni, setExpandedUni] = useState(null);    // { id, name, score }

  // Charger sélection depuis localStorage (et écouter les changements)
  useEffect(() => {
    const stored = localStorage.getItem('selectedUniversities');
    setSelectedUnis(stored ? JSON.parse(stored) : []);
    const onStorage = (e) => {
      if (e.key === 'selectedUniversities') {
        setSelectedUnis(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Charger scores + institutions + alphas
  useEffect(() => {
    (async () => {
      try {
        const stored = localStorage.getItem('alphas');
        const parsed = stored ? JSON.parse(stored) : { coeff_op: {}, coeff_ratio: {} };
        setAlphas(parsed);

        const [scoreRes, uniRes] = await Promise.all([
          axios.post('http://localhost:3001/scores/globalscores', parsed),
          axios.get('http://localhost:3001/institutions'),
        ]);

        setScores(scoreRes.data || []);
        setUniversities(uniRes.data || []);
      } catch (err) {
        console.error('Erreur chargement données rapport :', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // id -> nom
  const idToName = useMemo(() => {
    const map = {};
    universities.forEach(u => { map[u.id_institution] = u.name || u.id_institution; });
    return map;
  }, [universities]);

  // Filtre d’affichage
  const filteredScores = useMemo(() => {
    if (!selectedUnis?.length) return scores;
    return scores.filter(s => selectedUnis.includes(s.id_institution));
  }, [scores, selectedUnis]);

  if (loading) return <p>Chargement des scores…</p>;

  const isExpanded = !!expandedUni;

  return (
    <div className={`report-container ${isExpanded ? 'expanded' : ''}`}>
      <Header />

      <div className="report-header">
        <h2 className="report-title">Score écologique des universités</h2>
      </div>

      {/* Le graphique reste toujours affiché */}
      <div className="chart-section">
        <UniversityBarChart
          scores={filteredScores}
          universities={universities}
          selectedIds={selectedUnis}
        />
      </div>

      {/* Lien de retour quand on est en mode “expanded” */}
      {isExpanded && (
        <div className="back-row">
          <button className="back-link" onClick={() => setExpandedUni(null)}></button>
        </div>
      )}

      {/* Contenu : soit les box, soit le rapport détaillé */}
      {isExpanded ? (
        <ExpandedUniversityBox
          institutionId={expandedUni.id}
          institutionName={idToName[expandedUni.id] || expandedUni.name}
          initialGlobalScore={expandedUni.score}
          alphas={alphas}
          onBack={() => setExpandedUni(null)}
        />
      ) : (
        <div className="boxes-area">
          {filteredScores.length >0 && (
            <div className="compare-btn-wrapper">
              <button className="compare-button">Comparaison</button>
              
            </div>
          )}

          {/* Afficher les boxes des universités */}
          {filteredScores.map((s) => (
            <UniversityBox
              key={s.id_institution}
              institutionId={s.id_institution}
              institutionName={idToName[s.id_institution] || s.id_institution}
              initialGlobalScore={s.score}
              alphas={alphas}
              // Quand on clique sur l’icône “Agrandir” d’une box :
              onExpand={({ id, name, score }) => setExpandedUni({ id, name, score })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportPage;
