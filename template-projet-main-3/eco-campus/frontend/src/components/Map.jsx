import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


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

  return (
    <div>
      <div ref={mapContainer} style={{  width: '100vw', height: '100vh' }} />
    </div>
  );
}
