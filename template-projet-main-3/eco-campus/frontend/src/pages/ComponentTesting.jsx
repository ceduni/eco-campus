import React, { useState } from 'react';
import Map from '../components/Map';
import { MetricPanel } from '../components/MetricPanel';
import UniversityComparisonPanel from '../components/ComparaisonPanel';

export function ComponentTesting() {
  const [showPanel, setShowPanel] = useState(true); 

  return (
    <div>
      {showPanel && (
        <UniversityComparisonPanel
          idA="1"
          idB="2"
          onClose={() => setShowPanel(false)} 
        />
      )}
    </div>
  );
}

export default ComponentTesting;
