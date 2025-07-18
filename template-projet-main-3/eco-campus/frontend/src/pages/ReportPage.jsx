import React from 'react';
import Header from '../components/Header';
import './ReportPage.css';

const ReportPage = () => {
  return (
    <div className="report-container">
      <Header />
      <div className="report-content">
        <img src="/src/assets/graphique-score.svg" alt="Graphique" className="report-chart" />

        <div className="report-comparaison">
          <h2>Université de Montréal</h2>
          <p>Score: 92</p>
        </div>

        <div className="report-comparaison">
          <h2>Concordia</h2>
          <p>Score: 55</p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

