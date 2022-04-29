import React, { useState, useEffect } from 'react';
import axios from 'axios';

import addQuestionIcon from '../../assets/icons/add-question-icon.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import InputHelper from '../../Components/InputHelper';
import AlertHelper from '../../Components/Alert';
import SelectHelper from '../../Components/SelectHelper';
import SimpleModal from '../../Components/SimpleModal';

import './CreateQuestion.scss';

const CreateQuestion = () => {
  const [questions, setQuestions] = useState([{ value: '', label: '' }]);
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const handleChange = (e) => {
    setSelectedData(
      questions.find((question) => question.value === e.target.value)
    );
  };

  const getCategoriesQuestions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/question/get-category`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        const categories = res.data?.categories;
        let selectCategories = [];
        for (const categoryName in categories) {
          selectCategories.push({
            value: categories[categoryName],
            label: categoryName
          });
        }
        setQuestions(selectCategories);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const addQuestion = async () => {
    try {
      if (!weight || +weight < 1 || +weight > 10) {
        setAlert('warning');
        setErrorText('Введите вес вопроса от 1 до 10');
        setError(true);
      } else {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/question/add-question`,
          {
            description,
            category: selectedData.value,
            weight
          },
          {
            headers: {
              Authorization: localStorage.getItem('token')
            }
          }
        );
        if (res.data?.statusCode === 200) {
          setAlert('success');
          setErrorText(`Вопрос добавлен`);
          setError(true);
          setSelectedData([]);
          setWeight('');
          setDescription('');
          setOpen(false);
        }
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getCategoriesQuestions();
  }, []);

  return (
    <div className="create-question-main">
       <img
        src={addQuestionIcon}
        onClick={() => setOpen(true)}
        className="create-question-logo"
        alt="create-question-logo"
      />
      <span onClick={() => setOpen(true)} className="create-question-main-span">
        Добавить вопрос
      </span>
      <div className="create-question-body">
        <SimpleModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedData(null);
          }}
        >
          <div className="create-question-modal-main-container">
            <div className="create-question-select-div-span">
              <span className="create-question-select-span">Категория</span>
            </div>
            <div className="create-question-select">
              <div className="create-question-select-helper">
                {questions.length > 0 ? (
                  <SelectHelper
                    data={questions}
                    selectedData={selectedData}
                    onChange={handleChange}
                    placeholder="Выберите категорию"
                  />
                ) : null}
              </div>
              <div className="create-question-text-field">
                <InputHelper
                  onChange={(e) => setWeight(e.target.value)}
                  className="input-helper"
                  label="Вес"
                  value={weight}
                />
              </div>
            </div>
            <span className="create-question-textfield-span">Вопрос</span>
            <div className="create-question-textfield">
              <textarea
                className="create-question-textarea"
                margin="normal"
                variant="outlined"
                id="text-area"
                rows={20}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <ButtonHelper
                onClick={addQuestion}
                className="create-question-button"
              >
                <p>Добавить</p>
              </ButtonHelper>
            </div>
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

export default CreateQuestion;