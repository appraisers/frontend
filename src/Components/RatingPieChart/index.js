import { PieChart, Pie, Legend } from 'recharts';

import './RatingPieChart.scss';

const RatingPieChart = ({ user }) => {
  if (user.effectivenessRating == null) {
    return null;
  }

  const data = [
    { name: 'Effectiveness', rating: user.effectivenessRating, fill: 'white' },
    { name: 'Interaction', rating: user.interactionRating, fill: '#cfb389' },
    {
      name: 'Personal qualities',
      rating: user.personalQualitiesRating,
      fill: '#e3e1dc'
    },
    {
      name: 'Ability assessment',
      rating: user.assessmentOfAbilitiesRating,
      fill: '#dbd112'
    }
  ];

  return (
    <div className="rating-pie-chart">
      <PieChart width={250} height={200}>
        <Pie data={data} label outerRadius={80} dataKey="rating" />
        <Legend
          iconSize={10}
          width={150}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{
            top: '95%',
            lineHeight: '20px'
          }}
        />
      </PieChart>
    </div>
  );
};

export default RatingPieChart;
