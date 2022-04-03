import { PieChart, Pie, Legend } from 'recharts';

import './RatingPieChart.scss';

const data = [
  { name: 'Effectiveness', score: 4.5, fill: 'white' },
  { name: 'Interaction', score: 3.8, fill: '#cfb389' },
  { name: 'Personal qualities', score: 4.0, fill: '#e3e1dc' },
  { name: 'Ability assessment', score: 4.8, fill: '#dbd112' }
];

const style = {
  top: '95%',
  lineHeight: '20px'
};

const RatingPieChart = () => {
  return (
    <div className="rating-pie-chart">
      <PieChart width={200} height={200}>
        <Pie data={data} label outerRadius={80} dataKey="score" />
        <Legend
          iconSize={10}
          width={150}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={style}
        />
      </PieChart>
    </div>
  );
};

export default RatingPieChart;
