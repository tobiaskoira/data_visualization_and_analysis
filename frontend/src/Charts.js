import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

export const Charts = ({ analysisData, dataKey, title }) => {
  return (
    <div>
      <h3>{title}</h3>
      <BarChart width={600} height={400} data={analysisData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        {/* Use the dataKey prop to dynamically set which field to display */}
        <Bar dataKey={dataKey} fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export const TopSuppliersChart = ({ analysisData, dataKeyX, dataKeyY, title }) => {
    return (
      <div>
        <h3>{title}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={analysisData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey={dataKeyX} />
            <YAxis type="category" dataKey="supplier_city" width={200} /> {/* Display both supplier and city */}
            <Tooltip formatter={(value) => `$${value.toLocaleString()}`} labelFormatter={(label) => `Supplier: ${label}`} />
            <Legend />
            <Bar dataKey={dataKeyY} fill="#8884d8" name={title} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };


