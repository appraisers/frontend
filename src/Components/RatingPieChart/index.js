import React from 'react';
import { PieChart, Pie, Legend } from 'recharts';

import './RatingPieChart.scss';

const RatingPieChart = ({ user }) => {
  if (user.effectivenessRating == null) {
    return null;
  }

  const data = [
    {
      name: 'Эффективность',
      rating:
        user.effectivenessRating != null
          ? +user.effectivenessRating.toFixed(1)
          : 0,
      fill: 'white'
    },
    {
      name: 'Взаимодействие',
      rating:
        user.interactionRating != null ? +user.interactionRating.toFixed(1) : 0,
      fill: '#cfb389'
    },
    {
      name: 'Личные качества',
      rating:
        user.personalQualitiesRating != null
          ? +user.personalQualitiesRating.toFixed(1)
          : 0,
      fill: '#e3e1dc'
    },
    {
      name: 'Оценка способностей',
      rating:
        user.assessmentOfAbilitiesRating != null
          ? +user.assessmentOfAbilitiesRating.toFixed(1)
          : 0,
      fill: '#dbd112'
    }
  ];

  return (
    <div className="rating-pie-chart">
      <PieChart width={250} height={210}>
        <Pie data={data} label outerRadius={80} dataKey="rating"/>
        <Legend
          iconSize={10}
          width={150}
          layout="vertical"
          verticalAlign="middle"
          wrapperStyle={{
            marginTop: '3vh',
            top: '95%',
            lineHeight: '20px'
          }}
        />
      </PieChart>
    </div>
  );
};

export default RatingPieChart;
