import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const UniversityBarChart = ({ scores = [], universities = [] }) => {
  // Mapper les ID vers les noms à partir de la base
  const data = scores.map(({ id_institution, score }) => {
    const uni = universities.find((u) => u.id_institution === id_institution);
    return {
      name: uni?.name || id_institution,
      score,
    };
  });

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#FFD500" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UniversityBarChart;
