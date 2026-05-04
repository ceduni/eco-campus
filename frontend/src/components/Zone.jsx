import { useEffect } from 'react';
import axios from 'axios';

export function AllZonesLayer({ map }) {
  useEffect(() => {
    const fetchAndAddZones = async () => {
      try {
        const res = await axios.get('http://localhost:3001/markers');
        const universities = res.data;

        for (const uni of universities) {
          const nom = uni.name.toLowerCase();
          const layerId = `zones-${nom}`;
          const sourceId = `source-${nom}`;
          const url = `/geojson/${nom}.geojson`;
          console.log("Université reçue :", nom, layerId,sourceId,url);

          if (!map.getSource(sourceId)) {
            map.addSource(sourceId, {
              type: 'geojson',
              data: url,
            });

            map.addLayer({
              id: layerId,
              type: 'fill',
              source: sourceId,
              paint: {
                    'fill-color': isGreen ? '#00FF00' : '#FF0000',
                    'fill-opacity': 0.4
            },
            });
          }
        }
      } catch (err) {
        console.error('Erreur chargement zones:', err);
      }
    };

    fetchAndAddZones();

    return () => {
        if (!map) return;

        const style = map.getStyle?.();
        if (!style) return;

        style.layers?.forEach((layer) => {
            if (layer.id.startsWith('zones-')) map.removeLayer(layer.id);
        });

        if (style?.sources) {
            Object.keys(style.sources).forEach((sourceId) => {
            if (sourceId.startsWith('source-')) map.removeSource(sourceId);
            });
        }
    };

  }, [map]);

  return null;
}
