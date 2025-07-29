import Map from '../components/Map';
import React from 'react';
import { MetricPanel } from '../components/MetricPanel';
import UniversityComparisonPanel from '../components/ComparaisonPanel';

export function ComponentTesting() {
  return (
    <div>
        <UniversityComparisonPanel idA="1" idB="2" /> {/* test , les id devront etre prit dynamiquement selon la selection de l'utilisateur ...*/}
    </div>
  );
}

export default ComponentTesting;
