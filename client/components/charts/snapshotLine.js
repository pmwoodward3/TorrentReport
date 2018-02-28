import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  Label,
} from 'recharts';
import moment from 'moment';

export default (props) => {
  const data = props.snapshots.map((snapshot) => {
    const ratio = snapshot.seed / snapshot.leach;
    snapshot.ratio = Math.floor(ratio * 100) / 100;
    // snapshot.date = snapshot.createdAt;
    snapshot.date = moment(snapshot.createdAt).format();
    return snapshot;
  });

  return (
    <ResponsiveContainer height={250}>
      <ComposedChart
        data={data}
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
          <linearGradient id="leachC" x1="0" y1="0" x2="0" y2="1">
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
          dataKey="leach"
          stroke="#ff0000"
          fillOpacity={1}
          fill="url(#leachC)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
