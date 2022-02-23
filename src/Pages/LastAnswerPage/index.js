import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import './LastAnswerPage.scss';

const LastAnswerPage = () => {
  const history = useHistory();
  const { userId } = useParams();

  const [description, setDescription] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const onSubmit = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/review/finish-answer`,
        {
          userId,
          description
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if(res.data?.statusCode===200)
      {
        history.push(`/my`);
        
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };
  return (
    <div className="last-answer">
      <AuthorizedHeader title="Комментарии" />
      <div className="last-answer-body">
        <span className="text-field-span">Дополните свой отзыв</span>
        <TextField
          onChange={e => setDescription(e.target.value)}
          multiline
          fullWidth
          rows={20}
          margin="normal"
          variant="outlined"
          id="text-field"
        />
        <div className="survey-last-answer-container">
          <div className="helper-text-div">
            <span className="helper-text">
              Если Вы не хотите отвечать, то просто завершите опрос
            </span>
          </div>
          <div className="survey-last-answer-div">
            <span className="survey-last-answer-text" onClick={onSubmit}>
              Завершить
            </span>
          </div>
        </div>
      </div>
      
      <AlertHelper
        isOpen={openError}
        text={errorText}
        alertColor={alert}
        onClose={setError}
      />
    </div>
  );
};

export default LastAnswerPage;
