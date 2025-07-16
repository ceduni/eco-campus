import React from 'react';
import { useState } from 'react';
import { NumberInput, Slider } from '@mantine/core';
import './Filtre.css';
import { CustomButton } from '../widgets/Button';



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

export function MetricPanel(){
    return (
    <div className="metricPanel">
      <h2 className="metricPanelHeader">MÉTRIQUES</h2>    
    <div className='metricPanelContent'> 
      <MetricHeader
        title="OP1"
      />
      <MetricHeader
        title="OP2"
      />
      <MetricHeader
        title="OP3"
      />
      <MetricHeader
        title="OP4"
      />
      <MetricHeader
        title="OP5"
      />
      <MetricHeader
        title="OP6"
      />
      <MetricHeader
        title="OP7"
      />
      <MetricHeader
        title="OP8"
      />
      <MetricHeader
        title="Ratio 1"
      />
      <MetricHeader
        title="Ratio 2"
      />
      <MetricHeader
        title="Ratio 3"
      />
      <MetricHeader
        title="Ratio 4"
      />
      <MetricHeader
        title="Ratio 5"
      />
    </div>
    <div  className='metricPanelFooter'>
    <CustomButton
    text="Appliquer"/>
    </div>
  </div>
  );
}