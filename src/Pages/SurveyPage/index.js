import { NavLink } from 'react-router-dom';
import logoRight from '../../assets/images/logo.svg';
import StarRating from '../../Components/Rating/index.js';
import './SurveyPage.scss';

const SurveyPage = () => {
  const questionNumber = 1;
  const surveyAspect = 'Эффективность';

  const questions = [
    {
      category: 'Эффективность',
      description: 'Проявляет усердие в повседневной работе'
    },

    {
      category: 'Эффективность',
      description: 'Успевает выполнять работу в срок'
    },

    {
      category: 'Эффективность',
      description: 'Эффестивно работает над несколкими задачами одновремено'
    },

    {
      category: 'Эффективность',
      description: 'Успевает выполнять работу в срок'
    }
  ];

  return (
    <div className="survey-body">
      <div className="survey-header">
        <span className="survey-logo">
          <img src={logoRight} className="survey-logo-left" alt="logo" />
          <span className="question-number">
            Вопрос N<sup className="survey-underline">o</sup> {questionNumber}
          </span>
        </span>
        <span className="survey-logo">
          <img src={logoRight} className="survey-logo-right" alt="logo" />
        </span>
      </div>
      <div className="survey-main">
        <div className="survey-questions">
          <h1 className="survey-aspect">{surveyAspect}</h1>

          {questions.map((question) => (
            <div className="survey-question-container">
              <p className="survey-question">{question.description}</p>
              <StarRating />
            </div>
          ))}
        </div>

        <NavLink to="/next-question">
          <span className="survey-link-to-next-question">Следующий вопрос</span>
        </NavLink>
      </div>
    </div>
  );
};

export default SurveyPage;
