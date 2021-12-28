import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertHelper from '../../../../Components/Alert/Alert';
import BackgroundImage from '../../../../Components/BackgroundImage';
import ButtonHelper from '../../../../Components/ButtonHelper';
import InputPassword from '../../../../Components/InputPassword';

import './RestorePasswordSecondPage.scss';

const RestorePasswordSecondPage = () => {
  const history = useHistory();
  const RegexPassword = /(\w|@)+/;

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
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
    <div>
      <BackgroundImage />

      <div className="second-password">
        <div className="second-password-flexbox">
          <p className="header-text">Восстановление пароля</p>

          <InputPassword
            label="Новый пароль"
            className="input"
            value={password}
            onChange={setPassword}
            onBlur={checkPassword}
          />

          <InputPassword
            label="Повтор пароля"
            className="input"
            value={repeatPassword}
            onChange={setRepeatPassword}
            onBlur={checkPassword}
          />

          <ButtonHelper
            className="second-password-btn"
            variant="outlined"
            onClick={() => history.push('/')}
            disabled={openError}
          >
            Восстановить
          </ButtonHelper>

          <AlertHelper
            isOpen={openError}
            text={errorText}
            alertColor={alert}
            onClose={setError}
          />
        </div>
      </div>
    </div>
  );
};

export default RestorePasswordSecondPage;
