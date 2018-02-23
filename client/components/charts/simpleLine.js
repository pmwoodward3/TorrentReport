import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Label,
} from 'recharts';
import moment from 'moment';
import './styles.scss';

export default (props) => {
  const { syncId, pluck, data } = props;
  let maxSeed = 0;
  let maxLeach = 0;
  const newData = data.map((snapshot) => {
    if (snapshot.seed > maxSeed) maxSeed = snapshot.seed;
    if (snapshot.leach > maxLeach) maxLeach = snapshot.leach;
    const ratio = snapshot.seed / snapshot.leach;
    snapshot.ratio = Math.floor(ratio * 100) / 100;
    return snapshot;
  });
  const yAxisKey = maxSeed >= maxLeach ? 'seed' : 'leach';
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        data={newData}
        syncId={syncId}
        isAnimationActive={false}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 0,
        }}
      >
        <YAxis dataKey={yAxisKey} axisLine={!false} tickLine={false} hide={!false} />

        <XAxis dataKey="date" axisLine={!false} tickLine={false} hide={!false} />
        <Tooltip />
        {pluck.map((set, index) => (
          <Line
            key={`${index}-${set.key}`}
            type="monotone"
            dataKey={set.key}
            stroke={set.color}
            fill={set.color}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};
