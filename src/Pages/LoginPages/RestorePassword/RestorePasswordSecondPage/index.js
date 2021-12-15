import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';

import AlertHelper from '../../../../Components/Alert/Alert';
import BackgroundImage from '../../../../Components/BackgroundImage';
import './RestorePasswordSecondPage.scss';

const RestorePasswordSecondPage = () => {
  const history = useHistory();
  const RegexPassword = /(\w|@)+/;

  const [password, setPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const checkPassword = () => {
    if (!password.match(RegexPassword)) {
      setAlert('error');
      setErrorText(`Пароль может содержать буквы, цифры и @`);
      setError(true);
    } else {
      setAlert('success');
      setErrorText(`Корректый пароль`);
      setError(true);
    }
  };

  return (
    <>
      <BackgroundImage />

      <div className="second-password">
        <div className="second-password-flexbox">
          <p className="header-text">Восстановление пароля</p>

          <TextField
            InputLabelProps={{
              shrink: true,
              className: 'label'
            }}
            label="Новый пароль"
            type="password"
            className="input"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={checkPassword}
          />

          <TextField
            InputLabelProps={{
              shrink: true,
              className: 'label'
            }}
            label="Повтор пароля"
            type="password"
            className="input"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={ checkPassword}
          />

          <Button
            className="second-password-btn"
            variant="outlined"
            onClick={() => history.push('/')}
            disabled={openError}
          >
            Восстановить
          </Button>

          <AlertHelper
            isOpen={openError}
            text={errorText}
            alertColor={alert}
            onClose={setError}
          />
        </div>
      </div>
    </>
  );
};

export default RestorePasswordSecondPage;
