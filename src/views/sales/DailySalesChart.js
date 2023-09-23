import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const data = [
  { day: 'M', amount: 200 },
  { day: 'T', amount: 300 },
  { day: 'W', amount: 500 },
  { day: 'T', amount: 350 },
  { day: 'F', amount: 600 },
  { day: 'S', amount: 700 },
  { day: 'S', amount: 400 },
];

const DailySalesChart = () => {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        {/* X-Axis */}
        <XAxis dataKey="day" stroke="#000" />

        {/* Y-Axis */}
        <YAxis stroke="#000" />

        {/* Tooltip */}
        <Tooltip />

        {/* Bars */}
        <Bar dataKey="amount" fill="#147B72" />

        {/* Graph Heading */}
        <text x="50%" y="10" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#000">
          Weekly Sales
        </text>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DailySalesChart;
