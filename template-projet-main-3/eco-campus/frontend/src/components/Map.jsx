import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import axios from 'axios';


mapboxgl.accessToken = 'pk.eyJ1IjoibmFkYWFsZW0iLCJhIjoiY21jcGN6MTZoMDUzNTJtb3JpMGtqcno4NyJ9.tkeUmArmX6hFM6VyyfHbtA';

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.5673, 45.5017], // mtl
      zoom: 10,
    });
  }, []);

  // prendre dynamiquement les markers de la table institution 
  // REVOIR !!!! 
 /*  axios.get('http://localhost:3001/markers')
      .then((res) => {
        const markers = res.data;

        markers.forEach((marker) => {
          new mapboxgl.Marker({ color: marker.color || 'red' })
            .setLngLat([marker.lng, marker.lat])
            .addTo(mapRef.current);
        });
      })
      .catch((err) => {
        console.error('Erreur lors du fetch des markers :', err);
      }); */


  return (
    <div>
      <div ref={mapContainer} style={{  width: '100vw', height: '100vh' }} />
    </div>
  );
}
