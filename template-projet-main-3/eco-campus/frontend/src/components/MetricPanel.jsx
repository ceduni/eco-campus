import React from 'react';
import { NumberInput, Slider } from '@mantine/core';
import './Filtre.css';
import { CustomButton } from '../widgets/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';



export function SliderInput() {
  const [value, setValue] = useState(1);

  return (
    <div className='wrapper'>
      <Slider
        className='slider'
        value={value}
        onChange={setValue}
        min={0}
        max={1}
        step={0.01}
      />
      <NumberInput 
        className='input'
        value={value}
        onChange={setValue}
        step={0.01}
        min={0}
        max={1}
        hideControls
      /> 
    </div>
  );
}


export function MetricHeader({title}){
   return (
    <div className='metricHeader'>
      <p>{title}</p>
      <SliderInput/>
    </div>
  );
}

export function MetricPanel() {
  const [ratios, setRatios] = useState([]);
  const [metricStars, setMetricStars] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/ratios'),
      axios.get('http://localhost:3001/starsmetric'),
    ])
      .then(([resRatios, resMetrics]) => {
        setRatios(resRatios.data);
        setMetricStars(resMetrics.data);
        console.log(metricStars);
      })
      .catch((err) => console.error('Erreur fetch des données :', err));
  }, []);

  return (
    <div className="metricPanel">
      <h2 className="metricPanelHeader">MÉTRIQUES</h2>

      <div className="metricPanelContent">
        {metricStars.map((metric) => (
          <MetricHeader
            key={`metric-${metric.id_metric}`}
            title={metric.id_metric}
          />
        ))}

        {ratios.map((ratio) => (
          <MetricHeader
            key={`ratio-${ratio.id_ratios}`}
            title={ratio.id_ratios}
          />
        ))}
      </div>

      <div className="metricPanelFooter">
        <CustomButton text="Appliquer" />
      </div>
    </div>
  );
}