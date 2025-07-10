import React, { useEffect, useState } from 'react';
import { NumberInput, Slider } from '@mantine/core';
import './Filtre.css';
import { CustomButton } from '../widgets/Button';
import axios from 'axios';


export function SliderInput({ value, onChange }) {
  return (
    <div className='wrapper'>
      <Slider
        className='slider'
        value={value}
        onChange={onChange}
        min={0}
        max={1}
        step={0.01}
      />
      <NumberInput 
        className='input'
        value={value}
        onChange={onChange}
        step={0.01}
        min={0}
        max={1}
        hideControls
      /> 
    </div>
  );
}


export function MetricHeader({ title, value, onChange }) {
  return (
    <div className='metricHeader'>
      <p>{title}</p>
      <SliderInput value={value} onChange={onChange} />
    </div>
  );
}

export function MetricPanel() {
  const [ratios, setRatios] = useState([]);
  const [metricStars, setMetricStars] = useState([]);
  const [coeffRatios, setCoeffRatios] = useState({});
  const [coeffOps, setCoeffOps] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/ratios'),
      axios.get('http://localhost:3001/starsmetric'),
    ])
      .then(([resRatios, resMetrics]) => {
        setRatios(resRatios.data);
        setMetricStars(resMetrics.data);
      })
      .catch((err) => console.error('Erreur fetch des données :', err));
  }, []);

  
  const handleApply = async () => {
    const alphas = {
      coeff_ratio: coeffOps,   
      coeff_op: coeffRatios 
    };
    console.log('metricPanel',coeffOps, coeffRatios)

    try {
      const res = await axios.post('http://localhost:3001/scores', alphas);
      console.log('Retour:', res.data);
    } catch (err) {
      console.error('Erreur Alphas:', err);
    }
  };

  return (
    <div className="metricPanel">
      <h2 className="metricPanelHeader">MÉTRIQUES</h2>

      <div className="metricPanelContent">
        {metricStars.map((metric) => (
          <MetricHeader
            key={`metric-${metric.id_metric}`}
            title={metric.id_metric}
            value={coeffRatios [metric.id_metric] ?? 1}
            onChange={(val) =>
              setCoeffRatios ((prev) => ({ ...prev, [metric.id_metric]: val }))
            }
          />
        ))}

        {ratios.map((ratio) => (
          <MetricHeader
            key={`ratio-${ratio.id_ratios}`}
            title={ratio.id_ratios}
            value={coeffOps[ratio.id_ratios] ?? 1}
            onChange={(val) =>
              setCoeffOps((prev) => ({ ...prev, [ratio.id_ratios]: val }))
            }
          />
        ))}
      </div>

      <div className="metricPanelFooter">
        <CustomButton text="Appliquer" onClick={handleApply} />
      </div>
    </div>
  );
}
