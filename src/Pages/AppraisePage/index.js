import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import AlertHelper from '../../Components/Alert';
import SurveyHeader from '../../Components/SurveyHeader';
import StarRating from '../../Components/Rating/index.js';
import './AppraisePage.scss';

const LIMIT = 4;

const AppraisePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [offset, setOffset] = useState(0);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const questionNumber = 1;
  const surveyAspect = 'Эффективность';

  const getQuestions = async () => {
    let lastAnswer = false;
    try {
      // If answered post it
      if (answers.length) {
        const arrayAnswers = answers.map((answer) => answer.value);
        const arrayQuestionsIds = answers.map((questions) => questions.id);
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/review/add_answer`,
          {
            userId,
            ids: arrayQuestionsIds,
            answers: arrayAnswers
          },
          {
            headers: {
              Authorization: localStorage.getItem('tokenData')
            }
          }
        );
        if (res.data?.statusCode === 200) {
          setAnswers([]);
          lastAnswer = res.data.isLastAnswer;
        }
      }

      // If not last answer getQuestions
      if (!lastAnswer) {
        const res = await axios.get(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/question/questions?offset=${offset}&limit=${LIMIT}`
        );
        if (res.data?.statusCode !== 200) {
          setAlert('warning');
          setErrorText('Вопросы не найдены');
          setError('true');
        } else {
          setQuestions(res.data.questions);
        }
      } else {
        history.push('/my');
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const handleChange = (prev, index, value) => {
    let copyPrev = [...prev];

    const findAnswer = copyPrev.filter((value) => value.id === index);

    const newObject = {
      id: index,
      value
    };

    // Replace if already answered
    if (findAnswer.length) {
      const elementIndex = copyPrev.indexOf(findAnswer[0]);
      copyPrev.splice(elementIndex, 1, newObject);

      // If cancelled choise
      if (value === 0) {
        copyPrev.splice(elementIndex, 1);
      }
    } else {
      copyPrev = [...copyPrev, newObject];
    }

    return copyPrev;
  };

  return (
    <div className="survey-body">
      <SurveyHeader title={`тема  ${questionNumber} из ${questions.length}`} />
      <div className="survey-main">
        <div className="survey-questions">
          <h1 className="survey-aspect">{surveyAspect}</h1>

          {questions &&
            questions.map((question) => (
              <div className="survey-question-container" key={question.id}>
                <p className="survey-question">{question.description}</p>
                <StarRating
                  onChange={(value) => {
                    setAnswers((prev) =>
                      handleChange(prev, question.id, value)
                    );
                  }}
                />
              </div>
            ))}
        </div>

        <span
          className="survey-link-to-next-question"
          onClick={() => setOffset((prev) => prev + LIMIT)}
        >
          Следующий вопрос
        </span>

        <AlertHelper
          isOpen={openError}
          text={errorText}
          alertColor={alert}
          onClose={setError}
        />
      </div>
    </div>
  );
};

export default AppraisePage;
