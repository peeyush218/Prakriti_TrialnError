import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import '../Css/CarbonFootprintGraph.css';

const data = [
  { name: 'Jan', uv: 250 },
  { name: 'Feb', uv: 200 },
  { name: 'Mar', uv: 300 },
  { name: 'Apr', uv: 220 },
  { name: 'May', uv: 280 },
  { name: 'Jun', uv: 200 },
];

function CarbonFootprintGraph() {
  return (
    <div className="carbon-footprint-graph-container">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} className="carbon-footprint-graph">
          <defs>
            <linearGradient id="colorFootprint" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#ffc658" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="uv" stroke="#ffc658" fillOpacity={1} fill="url(#colorFootprint)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CarbonFootprintGraph; 