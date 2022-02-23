import React from 'react';
import { TextField } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import AuthorizedHeader from '../../Components/AuthorizedHeader';
import './LastAnswerPage.scss';

const LastAnswerPage = () => {
  return (
    <div className="last-answer">
     <AuthorizedHeader title="Комментарии" />
      <div className="last-answer-body">
        <span className="text-field-span">Дополните свой отзыв</span>
        <TextField
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
            <NavLink to="/my" className="survey-last-answer-link">
              <span className="survey-last-answer-text">Завершить</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastAnswerPage;
