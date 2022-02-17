import React from 'react';
import Rate from 'rc-rate';
import 'rc-rate/assets/index.css';
import './Rating.css';

const StarRating = ({ onChange }) => {
  return <Rate onChange={onChange} />;
};

export default StarRating;
