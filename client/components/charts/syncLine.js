import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';
import moment from 'moment';
import './styles.scss';

const CustomTooltip = (props) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div className="label">
          <p>{`${payload[0].payload.date}`}</p>
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

const SyncLine = (props) => {
  const { syncId, pluck, data } = props;
  let maxSeed = 0;
  let maxLeech = 0;

  const holderObj = {};
  data.forEach((snap) => {
    if (snap.seed > maxSeed) maxSeed = snap.seed;
    if (snap.leech > maxLeech) maxLeech = snap.leech;
    const ratio = snap.seed / snap.leech;
    const generalDate = moment(new Date(snap.date)).format('MM/DD/YYYY');
    if (holderObj[generalDate]) {
      const currentRatio = holderObj[generalDate].seed / holderObj[generalDate].leech;
      if (snap.seed > holderObj[generalDate].seed) holderObj[generalDate].seed = snap.seed;
      if (snap.leech > holderObj[generalDate].leech) holderObj[generalDate].leech = snap.leech;
      if (currentRatio > holderObj[generalDate].ration) holderObj[generalDate].ratio = currentRatio;
    } else {
      holderObj[generalDate] = {
        ratio: Math.floor(ratio * 100) / 100, // eslint-disable-line
        date: generalDate,
        seed: snap.seed,
        leech: snap.leech,
      };
    }
  });
  const newData = Object.keys(holderObj).map(key => holderObj[key]);
  const yAxisKey = maxSeed >= maxLeech ? 'seed' : 'leech';
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

export default SyncLine;
