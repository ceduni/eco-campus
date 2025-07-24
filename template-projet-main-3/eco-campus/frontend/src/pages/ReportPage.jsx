import React from 'react';
import Header from '../components/Header';
import UniversityBarChart from '../components/UniversityBarChart';
import './ReportPage.css';

const ReportPage = () => {
  return (
    <div className="report-container">
      <Header />

      <h2 className="report-title">Score écologique des universités</h2>
      <div className="chart-section">
        <UniversityBarChart />
      </div>

      <div className="uni-box">
        <h3>Université de Montréal</h3>
        <span className="score-badge">92</span>
        <div className="op-list">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="op-item">
              <span>OP1 : Building design and construction</span>
              <progress value="1" max="5"></progress>
              <span>1/5</span>
            </div>
          ))}
        </div>
      </div>

      <div className="uni-box">
        <h3>Concordia</h3>
        <span className="score-badge">55</span>
        <div className="op-list">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="op-item">
              <span>OP1 : Building design and construction</span>
              <progress value="1" max="5"></progress>
              <span>1/5</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
