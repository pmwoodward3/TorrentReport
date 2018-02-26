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

const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="label">
          <p>{`${moment(payload[0].payload.date).format('MM/DD/YYYY')}`}</p>
          <p>{`${moment(payload[0].payload.date).format('HH:mm:ss')}`}</p>
        </div>
        <div className="desc">
          <div className="row" style={{ color: payload[1].fill }}>
            <div className="left">{payload[1].dataKey}ers</div>
            <div className="right">{payload[1].value}</div>
          </div>
          <div className="row" style={{ color: payload[0].fill }}>
            <div className="left">{payload[0].dataKey}ers</div>
            <div className="right">{payload[0].value}</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default (props) => {
  const { syncId, pluck, data } = props;
  let maxSeed = 0;
  let maxLeach = 0;
  const newData = data.map((snapshot) => {
    if (snapshot.seed > maxSeed) maxSeed = snapshot.seed;
    if (snapshot.leach > maxLeach) maxLeach = snapshot.leach;
    const ratio = snapshot.seed / snapshot.leach;
    snapshot.ratio = Math.floor(ratio * 100) / 100;
    snapshot.date = moment(snapshot.createdAt).format();
    return snapshot;
  });
  const yAxisKey = maxSeed >= maxLeach ? 'seed' : 'leach';
  return (
    <ResponsiveContainer height={150}>
      <LineChart
        data={newData}
        syncId={syncId}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 10,
        }}
      >
        <YAxis dataKey={yAxisKey} axisLine={!false} tickLine={false} hide={false} />

        <XAxis dataKey="date" axisLine={!false} tickLine={false} hide={false} />
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
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};
