// Fix: Created the DataChart component to render bar charts from analysis data.
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartDataItem } from '../types';

interface DataChartProps {
  data: ChartDataItem[];
}

export const DataChart: React.FC<DataChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-slate-400 p-4 flex items-center justify-center h-full">No chart data available.</div>;
  }

  // Get the keys for the bars dynamically, excluding 'name'
  const barKeys = Object.keys(data[0] || {}).filter(key => key !== 'name');
  
  // A palette of colors for the bars, designed for a dark theme
  const colors = ['#0ea5e9', '#6366f1', '#ec4899', '#f97316', '#10b981'];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          cursor={{ fill: '#1e293b' }}
          contentStyle={{
            backgroundColor: '#0f172a',
            borderColor: '#334155',
            borderRadius: '0.5rem'
          }}
          labelStyle={{ color: '#f1f5f9' }}
        />
        <Legend wrapperStyle={{ color: '#cbd5e1' }} />
        {barKeys.map((key, index) => (
          <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};
