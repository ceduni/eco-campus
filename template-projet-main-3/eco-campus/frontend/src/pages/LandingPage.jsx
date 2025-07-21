import React,  { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatButton from '../components/ChatButton';
import Map from '../components/Map';

import './LandingPage.css'; 


const LandingPage = () => 
  {
  const [mapInstance, setMapInstance] = useState(null);
  return (
    <div className="landing-container">
    <Map onMapReady={setMapInstance} />
    <Header />
    <Sidebar mapInstance={mapInstance} />
    <ChatButton />
    </div>
  );
};


export default LandingPage;


