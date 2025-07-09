import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ChatButton from '../components/ChatButton';
import Map from '../components/Map';
import './LandingPage.css'; // 💡 Ajoute ce fichier CSS pour gérer le layout

const LandingPage = () => {
  return (
    <div className="landing-container">
    <Map />
    <Header />
    <Sidebar />
    <ChatButton />
    </div>
  );
};

export default LandingPage;

