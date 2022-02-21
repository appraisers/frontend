import logoLeft from '../../assets/images/logo-left.svg';
import logoRight from '../../assets/images/logo-right.svg';

import './SurveyHeader.scss';

const SurveyHeader = (props) => {
  return (
    <div className="survey-header">
      <span className="survey-logo">
        <img src={logoLeft} className="survey-logo-left" alt="logo" />
      </span>
      <span className="question-number">
        {props.title} 
      </span>
      <span className="survey-logo">
        <img src={logoRight} className="survey-logo-right" alt="logo" />
      </span>
    </div>
  );
};

export default SurveyHeader;
