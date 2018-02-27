import React from 'react';
import moment from 'moment';
import Loader from '../loader';

import { PieChart, Pie, Sector, Cell, LabelList } from 'recharts';

class SeedLeachPie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  render() {
    if (!this.props.seed || !this.props.leach) return <div />;
    const data = [
      { name: 'seeders', value: this.props.seed },
      { name: 'leachers', value: this.props.leach },
    ];
    const COLORS = { seeders: '#008000', leachers: '#ff0000' };

    const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      fill,
      innerRadius,
      outerRadius,
      percent,
      payload,
      value,
      index,
    }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.3;
      const x2 = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.3;
      const y2 = y - 15;

      return (
        <g>
          <text
            x={x}
            y={y}
            fill={fill}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${payload.name}`}
          </text>
          <text
            x={x}
            y={y2}
            fill={fill}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${value}`}
          </text>
        </g>
      );
    };

    const RADIAN = Math.PI / 180;
    return (
      <PieChart width={320} height={130}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx={150}
          cy={120}
          startAngle={180}
          endAngle={0}
          innerRadius={50}
          outerRadius={70}
          paddingAngle={5}
          label={renderCustomizedLabel}
          isAnimationActive={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} strokeWidth={0} fill={COLORS[entry.name]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
}

export default SeedLeachPie;
