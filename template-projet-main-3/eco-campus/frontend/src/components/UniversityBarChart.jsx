import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

// Petit hook pour connaître la largeur dispo
function useContainerWidth(ref) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setW(entry.contentRect.width || 0);
    });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return w;
}

export default function UniversityBarChart({
  scores = [],
  universities = [],
  selectedIds = [],
}) {
  // id -> nom affiché
  const idToName = useMemo(() => {
    const map = {};
    universities.forEach(u => { map[u.id_institution] = u.name || u.id_institution; });
    return map;
  }, [universities]);

  // données filtrées (toutes si rien n’est sélectionné)
  const data = useMemo(() => {
    const base = selectedIds?.length
      ? scores.filter(s => selectedIds.includes(s.id_institution))
      : scores;

    return base.map(s => ({
      id: s.id_institution,
      name: idToName[s.id_institution] || s.id_institution,
      score: s.score ?? 0,
    }));
  }, [scores, selectedIds, idToName]);

  // ---- paramètres d’apparence (barres minces, gaps constants)
  const BAR_SIZE = 48;        // largeur d’une barre (mince)
  const CAT_GAP  = 14;        // espace entre catégories
  const PER_BAR_WIDTH = BAR_SIZE + CAT_GAP + 8; // “place” par barre (px)
  const MIN_CHART_WIDTH = 420; // largeur mini pour l’esthétique

  // ---- container et largeur “compacte” désirée
  const outerRef = useRef(null);
  const containerWidth = useContainerWidth(outerRef);

  // largeur idéale selon le nombre de barres (sans dépasser le conteneur)
  const desiredWidth = Math.max(MIN_CHART_WIDTH, data.length * PER_BAR_WIDTH);
  const innerWidth = containerWidth
    ? Math.min(containerWidth, desiredWidth)  // jamais plus large que le conteneur
    : desiredWidth;

  return (
    // pas d’overflow => pas de scroll
    <div ref={outerRef} style={{ width: '100%', height: 320 }}>
      {/* on centre un “sous-conteneur” qui peut être plus étroit que la page */}
      <div style={{ width: innerWidth, height: '100%', margin: '0 auto' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 24, right: 24, left: 12, bottom: 10 }}
            barCategoryGap={CAT_GAP}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              height={34}
            />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#FFD500" barSize={BAR_SIZE} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}