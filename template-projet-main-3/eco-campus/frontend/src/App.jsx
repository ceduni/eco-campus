import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Map from './components/Map';

function App() {
  return (
    <div>
      <h1>Carte interactive</h1>
      <Map/>
    </div>
  );
}

export default App;
