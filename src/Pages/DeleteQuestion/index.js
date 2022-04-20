import React, { useState, useEffect } from 'react';
import axios from 'axios';

import deleteIcon from '../../assets/icons/delete-icon.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';
import SelectHelper from '../../Components/SelectHelper';
import SimpleModal from '../../Components/SimpleModal';

import './DeleteQuestion.scss';

const DeleteQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [renderQuestions, setRenderQuestions] = useState([]);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState([]);
  const [categorisOfQuestions, setCategorisOfQuestions] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openError, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const handleChange = (e) => {
    setSelectedQuestion(
      categorisOfQuestions.find((question) => question.value === e.target.value)
    );
  };

  const handleSelectQuestions = (prev, index, value) => {
    let questionsPrev = [...prev];
    const findQuestions = questionsPrev.filter((value) => value.id === index);
    const newObject = {
      id: index,
      value
    };
    if (findQuestions.length) {
      const elementIndex = questionsPrev.indexOf(findQuestions[0]);
      questionsPrev.splice(elementIndex, 1, newObject);

      if (value === false) {
        questionsPrev.splice(elementIndex, 1);
      }
    } else {
      questionsPrev = [...questionsPrev, newObject];
    }
    return questionsPrev;
  };

  const filteredQuestion = () => {
    if (selectedQuestion !== null) {
      const filteredQuestion = questions.filter(
        (item) => item.category === selectedQuestion.value
      );
      setRenderQuestions(filteredQuestion);
    }
  };

  const getQuestions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/question/questions?allQuestions=true`
      );
      if (res.data?.statusCode !== 200) {
        setAlert('warning');
        setErrorText('Вопросы не найдены');
        setError('true');
      } else {
        setQuestions(res.data.questions);

        // Get uniq categories in questions
        const uniqCategories = [
          ...new Set(res.data.questions.map((question) => question.category))
        ];
        const selectFormatCategory = uniqCategories.map((category) => ({
          value: category,
          label: category
        }));
        setCategorisOfQuestions(selectFormatCategory);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const deleteQuestions = async () => {
    try {
      if (selectedQuestion.value.length) {
        const questionIds = selectedQuestionIds.map(
          (questions) => questions.id
        );

        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/question/delete`,
          {
            ids: questionIds
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        );
        if (res.data?.statusCode === 200) {
          setErrorText('Успешно');
          setAlert('success');
          setError(true);
          setSelectedQuestion(null);
          setOpen(false);
          setRenderQuestions([]);
          getQuestions();
        }
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    if (open) {
      getQuestions();
    }
  }, [open]);

  useEffect(() => {
    filteredQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedQuestion]);

  return (
    <div className="delete-question-main">
        <img
        src={deleteIcon}
        onClick={() => setOpen(true)}
        className="delete-question-logo"
        alt="delete-question-logo"
      />
      <span onClick={() => setOpen(true)} className="delete-question-main-span">
        Удалить вопрос
      </span>
      <div className="delete-question-body">
        <SimpleModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedQuestion(null);
            setRenderQuestions([]);
          }}
        >
          <div className="delete-question-modal-main-container">
            <span className="delete-question-select-span">Категория</span>
            <div className="delete-question-select">
              <SelectHelper
                data={categorisOfQuestions}
                selectedData={selectedQuestion}
                onChange={handleChange}
                placeholder="Выберите категорию"
              />
            </div>
            {renderQuestions.length > 0 ? (
              <>
                <div>
                  <span className="delete-question-span">Вопрос</span>
                </div>

                <div className="delete-question-select-two">
                  <div className="delete-question-div">
                    {renderQuestions.map((question) => (
                      <div key={question.id} className="delete-question-dt">
                        {question.description}
                        <input
                          type="checkbox"
                          className="delete-question-div-input"
                          id="checkbox"
                          name="checkbox"
                          value={selectedQuestionIds}
                          onChange={(e) => {
                            setSelectedQuestionIds((prev) =>
                              handleSelectQuestions(
                                prev,
                                question.id,
                                e.target.checked
                              )
                            );
                          }}
                        ></input>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bottom-delete-button-container">
                  <ButtonHelper
                    onClick={deleteQuestions}
                    className="delete-question-button"
                  >
                    Удалить
                  </ButtonHelper>
                </div>
              </>
            ) : null}
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

export default DeleteQuestion;