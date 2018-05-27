import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Label,
} from 'recharts';
import moment from 'moment';

const SnapshotLine = (props) => {
  let maxSeed = 0;
  let maxLeech = 0;
  const holderObj = {};
  props.data.forEach((snap) => {
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

  const newData = Object.keys(holderObj)
    .map(key => holderObj[key])
    .sort((lhs, rhs) => {
      const leftDate = new Date(lhs.date);
      const rightDate = new Date(rhs.date);
      // const leftDate = moment(lhs.date, 'MM/DD/YYYY');
      // const rightDate = moment(rhs.date, 'MM/DD/YYYY');
      if (leftDate > rightDate) {
        return 1;
      } else if (leftDate < rightDate) {
        return -1;
      }
      return 0;
    });

  return (
    <ResponsiveContainer height={250}>
      <ComposedChart
        data={newData}
        margin={{
          top: 0,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="seedC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#008000" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#008000" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="leechC" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff0000" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#ff0000" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" scale="auto">
          <Label value="scrape date" position="bottom" />
        </XAxis>
        <YAxis yAxisId="left">
          <Label angle={-90} value="users" position="left" unit="users" />
        </YAxis>
        <YAxis yAxisId="right" orientation="right">
          <Label angle={90} value="ratio" position="right" />
        </YAxis>

        <Tooltip />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="ratio"
          dot={{ strokeWidth: 3 }}
          stroke="#000000"
          strokeWidth={3}
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="seed"
          stroke="#008000"
          fillOpacity={1}
          fill="url(#seedC)"
        />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="leech"
          stroke="#ff0000"
          fillOpacity={1}
          fill="url(#leechC)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SnapshotLine;
