import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import SimpleModal from '../../Components/SimpleModal';
import ButtonHelper from '../../Components/ButtonHelper';

import { TranslateCategory } from '../../Components/Constants.js';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import StarRating from '../../Components/Rating';
import './AppraisePage.scss';

const LIMIT = 4;
const OFFSET = 0;

const AppraisePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [user, setUser] = useState(null);
  const [questions, setQuestions] = useState(null);
  const [categoryQuestions, setCategoryQuestions] = useState('');
  const [offset, setOffset] = useState(OFFSET);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [modal, setModal] = useState(false);

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
              Authorization: localStorage.getItem('token')
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
          `${process.env.REACT_APP_SERVER_ENDPOINT}/question/questions?offset=${offset}&limit=${LIMIT}&position=${user?.position}`
        );
        if (res.data?.statusCode !== 200) {
          setAlert('warning');
          setErrorText('Вопросы не найдены');
          setError('true');
        } else {
          setQuestions(res.data.questions);
          setCategoryQuestions(res.data.questions?.[0]?.category);
        }
      } else {
        history.push(`/appraise-description/${userId}`);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const getAppraiseUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/info`,
        {
          userId
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setUser(res.data.user);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getAppraiseUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      // If cancelled choice
      if (value === 0) {
        copyPrev.splice(elementIndex, 1);
      }
    } else {
      copyPrev = [...copyPrev, newObject];
    }

    return copyPrev;
  };

  const nextQuestionsHandler = () => {
    if (questions.length === answers.length) {
      setOffset((prev) => prev + LIMIT);
    } else {
      setModal(true);
    }
  };

  return (
    <div className="apprise-body">
      <AuthorizedHeader />
      <div className="apprise-main">
        <div className="apprise-questions">
          <h1 className="apprise-aspect">
            {TranslateCategory(categoryQuestions)}
          </h1>

          {questions &&
            questions.map((question) => (
              <div className="apprise-question-container" key={question.id}>
                <p className="apprise-question">
                  {user == null
                    ? question.description
                    : question.description.replace('{name}', user.fullname)}
                </p>
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

        {questions?.length ? (
          <ButtonHelper
            className="apprise-link-to-next-question"
            onClick={nextQuestionsHandler}
          >
            Следующий вопрос
          </ButtonHelper>
        ) : null}

        <SimpleModal open={modal} onClose={() => setModal(false)}>
          <div className="modal-child">
            <p className="modal-child-description">
              Ответьте на все вопросы, чтобы продолжить
            </p>
            <ButtonHelper
              className="modal-child-exit"
              onClick={() => setModal(false)}
            >
              Назад
            </ButtonHelper>
          </div>
        </SimpleModal>

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
