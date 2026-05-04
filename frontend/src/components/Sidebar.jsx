import React from 'react';
import styles from './Sidebar.module.css';
import { MetricPanel } from './MetricPanel';
import { Layers } from './Layers';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Sidebar = ({
  mapInstance,
  onInstitutionSelect,
  selectedIds = [],
  setSelectedIds,
  onCompareClick,
  isComparing,          
  setIsComparing      
}) => {
  const [showMetricPanel, setShowMetricPanel] = React.useState(false);
  const [showLayers, setShowLayers] = React.useState(false);

  const canCompare = selectedIds.length === 2;

  return (
    <div className={styles.sidebar}>
      {/* Layers button */}
      <button className={styles.control} onClick={() => setShowLayers(prev => !prev)}>
        <img src="src/assets/layers button.svg" alt="Couches" />
      </button>

      {showLayers && (
        <Layers
          mapInstance={mapInstance}
          onInstitutionSelect={onInstitutionSelect}
          selectedUniversities={selectedIds}
          setSelectedUniversities={setSelectedIds}
        />
      )}

      {/* Filter button */}
      <button className={styles.control} onClick={() => setShowMetricPanel(prev => !prev)}>
        <img src="src/assets/filter button.svg" alt="Filter" />
      </button>

      {showMetricPanel && (
        <MetricPanel mapInstance={mapInstance} onInstitutionSelect={onInstitutionSelect} />
      )}

      {/* COMPARER Button */}
      <div>
        <button
          className={`
            ${styles.compareButton} 
            ${canCompare ? styles.enabled : styles.disabled} 
            ${isComparing ? styles.active : ''}
          `}
          onClick={() => {
            if (canCompare) {
              setIsComparing(true);  
              onCompareClick();       
            }
          }}
          disabled={!canCompare}
          data-tooltip-id="compare-tooltip"
          data-tooltip-content={
            canCompare
              ? ''
              : 'Sélectionnez deux universités dans le filtre couche "université" pour activer la comparaison'
          }
        >
          COMPARER
        </button>

        <Tooltip
          id="compare-tooltip"
          place="top"
          className="custom-tooltip"
          opacity={1}
          style={{ zIndex: 9999 }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
