import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import '../Css/ContributionGraph.css';

const data = [
  { name: 'Jan', pv: 1000 },
  { name: 'Feb', pv: 1300 },
  { name: 'Mar', pv: 1200 },
  { name: 'Apr', pv: 1800 },
  { name: 'May', pv: 1600 },
  { name: 'Jun', pv: 2300 },
];

function ContributionGraph() {
  return (
    <div className="contribution-graph-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} className="contribution-graph">
          <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ContributionGraph; 