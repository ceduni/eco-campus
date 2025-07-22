import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import axios from 'axios';
import pinCarte from '../assets/pinCarte.svg';
import '../assets/pinCarte.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibmFkYWFsZW0iLCJhIjoiY21jcGN6MTZoMDUzNTJtb3JpMGtqcno4NyJ9.tkeUmArmX6hFM6VyyfHbtA';

export default function Map({ onMapReady }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.5673, 45.5017], // mtl
      zoom: 12,
    });

    map.current.on('load', () => {
      onMapReady(map.current);
    });

  }, []);

  // prendre dynamiquement les markers de la table institution 
  // REVOIR !!!! 
  axios.get('http://localhost:3001/markers')
  .then((res) => {
    const markers = res.data;

    markers.forEach((marker) => {
      const el = document.createElement('img');
      el.src = pinCarte;
      el.alt = 'marker pin';
      el.className = 'map-pin';

      const popup = new mapboxgl.Popup()
        .setHTML(`<h3>${marker.name}</h3>`);

      new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map.current);
        console.log("pins added");

    });
  })
  .catch((err) => {
    console.error('Erreur lors du fetch des pins :', err);
  });




  return (
    <div>
      <div ref={mapContainer} style={{  width: '100vw', height: '100vh' }} />
    </div>
  );
}
