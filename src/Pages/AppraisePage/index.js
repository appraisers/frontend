import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import SimpleModal from '../../Components/SimpleModal';
import ModalPopUp from '../../Components/ModalPopUp';

import { TranslateCategory } from '../../Components/Constants.js';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import StarRating from '../../Components/Rating';
import './AppraisePage.scss';

const LIMIT = 4;
let answersLength = 0;

const AppraisePage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState(null);
  const [categoryQuestions, setCategoryQuestions] = useState('');
  const [offset, setOffset] = useState(0);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [modal, setModal] = useState(false);
  const modalOpen = () => setModal(true);
  const modalClose = () => setModal(false);

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
          `${process.env.REACT_APP_SERVER_ENDPOINT}/question/questions?offset=${offset}&limit=${LIMIT}&position=manager`
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

    answersLength = copyPrev.length;
    return copyPrev;
  };

  const nextQuestionsHandler = () => {
    
    console.log(answersLength);

    // if (questions.length > answersLength) {
    //   setOffset((prev) => prev + LIMIT);
    // } else {
    //   modalOpen();
    // }
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
                <p className="apprise-question">{question.description}</p>
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
          className="apprise-link-to-next-question"
          onClick={nextQuestionsHandler}
        >
          Следующий вопрос
        </span>

        <SimpleModal open={modal} onClose={modalClose}>
          <ModalPopUp removeModalHandler={modalClose} />
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
