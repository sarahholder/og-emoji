import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

import smashData from '../../../helpers/data/smashData';
import authData from '../../../helpers/data/authData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#CDDAF0', '#D0EE9F', '#91A5f4'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class Charts extends React.Component {
  state = {
    data: [],
  }

  getTotals = () => {
    const uid = authData.getUid();
    smashData.getJournalsWithStatusId(uid)
      .then((journals) => {
        const totalsArr = [];
        const happyArr = journals.filter((x) => x.statusName === 'happy');
        const totalHappy = { name: 'happy', value: happyArr.length };

        const sadArr = journals.filter((x) => x.statusName === 'sad');
        const totalSad = { name: 'sad', value: sadArr.length };

        const angryArr = journals.filter((x) => x.statusName === 'angry');
        const totalAngry = { name: 'angry', value: angryArr.length };

        const depressedArr = journals.filter((x) => x.statusName === 'depressed');
        const totalDepressed = { name: 'depressed', value: depressedArr.length };

        const lonelyArr = journals.filter((x) => x.statusName === 'lonely');
        const totalLonely = { name: 'lonely', value: lonelyArr.length };

        const hopelessArr = journals.filter((x) => x.statusName === 'hopeless');
        const totalHopeless = { name: 'hopeless', value: hopelessArr.length };

        const scaredArr = journals.filter((x) => x.statusName === 'scared');
        const totalScared = { name: 'scared', value: scaredArr.length };

        const stressedArr = journals.filter((x) => x.statusName === 'stressed');
        const totalStressed = { name: 'stressed', value: stressedArr.length };

        totalsArr.push(totalHappy, totalSad, totalAngry, totalDepressed, totalLonely, totalHopeless, totalScared, totalStressed);
        console.error('this is the totals arr', totalsArr);
        this.setState({ data: totalsArr });
      })
      .catch((err) => console.error('unable to get journals', err));
  }

  componentDidMount = () => {
    this.getTotals();
  }

  render() {
    const data = this.state;
    console.error('this is the state array', data);

    return (
      <PieChart width={30} height={10}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}

export default Charts;
