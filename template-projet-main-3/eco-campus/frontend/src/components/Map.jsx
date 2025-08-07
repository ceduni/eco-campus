import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import axios from 'axios';
import pinCarte from '../assets/pinCarte.svg';
import '../assets/pinCarte.css';
import { createRoot } from 'react-dom/client';

export const initialMarkers = []; 

mapboxgl.accessToken = 'pk.eyJ1IjoibmFkYWFsZW0iLCJhIjoiY21jcGN6MTZoMDUzNTJtb3JpMGtqcno4NyJ9.tkeUmArmX6hFM6VyyfHbtA';

export default function Map({ onMapReady, onInstitutionClick }) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.5673, 45.5017],
      zoom: 12,
    });

    map.current.on('load', () => {
      onMapReady(map.current);

      axios.get('http://localhost:3001/institutions')
        .then((res) => {
          const markers = res.data;

          markers.forEach((marker) => {
            const el = document.createElement('div');
            const root = createRoot(el);

            root.render(
              <div className="pin-wrapper" onClick={() => onInstitutionClick(marker.id_institution)}>
                <div className='pin-header'>
                  <div className="pin-label">{marker.name}</div>
                  <img src={`/logos/${marker.logo}`} className="pin-logo" alt={marker.name} />
                </div>
                <img src={pinCarte} alt="pin" className="map-pin" />
              </div>
            );

            const markerObj = new mapboxgl.Marker(el)
              .setLngLat([marker.lng, marker.lat])
              .addTo(map.current);

            initialMarkers.push(markerObj); 
          });
        })
        .catch((err) => {
          console.error('Erreur lors du fetch des pins :', err);
        });
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100vw', height: '100vh' }} />
    </div>
  );
}
