import React, { useEffect, useState } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client'; 
import './ScoreMarker.css';

export function Score({ name, value }) {
  return (
    <div className='score-bulle'>
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}

export function ScoreDisplay({ scores, mapInstance }) {
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/markers')
      .then((res) => setMarkersData(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
/*     console.log("Scores:", scores);
    console.log("Map instance:", mapInstance);
    console.log("Markers Data:", markersData); */

    if (!mapInstance || markersData.length === 0 || scores.length === 0) return;

    const markerMap = new Map(
      markersData.map(m => [String(m.id_institution), m])
    );

    const createdMarkers = [];

    scores.forEach(scoreEntry => {
      const marker = markerMap.get(scoreEntry.id_institution);
      if (!marker) return;

      const el = document.createElement('div');
      const root = createRoot(el); 
      root.render(<Score name={marker.name} value={scoreEntry.score} />);

      const markerObj = new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .addTo(mapInstance);

      createdMarkers.push(markerObj);
    });

    return () => {
      createdMarkers.forEach(m => m.remove());
    };
  }, [mapInstance, markersData, scores]);

  return null;
}
