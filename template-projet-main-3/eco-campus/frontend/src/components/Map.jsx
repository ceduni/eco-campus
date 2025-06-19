import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map() {
  useEffect(() => {
    if (document.getElementById('map')._leaflet_id) return;

    const map = L.map('map').setView([45.5017, -73.5673], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
}

export default Map;
