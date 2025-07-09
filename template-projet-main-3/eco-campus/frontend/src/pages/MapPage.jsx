import Map from '../components/Map';
import React from 'react';
import { SliderInput } from '../components/MetricPanel';
import { MetricPanel } from '../components/MetricPanel';

export function MapPage() {
  return (
    <div>
      <MetricPanel/>
      <h1>Eco-Campus</h1>
      <Map/>
      
    </div>
  );
}

export default MapPage;
