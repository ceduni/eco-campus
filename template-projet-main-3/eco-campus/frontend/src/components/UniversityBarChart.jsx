import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Concordia', score: 55 },
  { name: 'HEC Montréal', score: 65 },
  { name: 'McGill', score: 68 },
  { name: 'UQAM', score: 82 },
  { name: 'Université de Montréal', score: 92 },
];

const UniversityBarChart = () => {
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
