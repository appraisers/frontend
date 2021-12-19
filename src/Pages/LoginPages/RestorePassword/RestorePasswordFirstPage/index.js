import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AlertHelper from '../../../../Components/Alert/Alert';
import BackgroundImage from '../../../../Components/BackgroundImage';
import InputHelper from '../../../../Components/InputHelper';
import ButtonHelper from '../../../../Components/ButtonHelper';

import './RestorePasswordFirstPage.scss';

const RestorePasswordFirstPage = () => {
  const history = useHistory();
  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const checkEmail = (e) => {
    if (!email.match(regexpEmail)) {
      setAlert('error');
      setErrorText(`Пример: jsmith@example.com`);
      setError(true);
    } else {
      setAlert('success');
      setErrorText(`Корректый E-mail`);
      setError(true);
    }
  };

  return (
    <>
      <BackgroundImage />

      <div className="restore-password">
        <div className="restore-password-flexbox">
          <p className="header-text">Восстановление пароля</p>

          <InputHelper
            label="Почта"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
            required
          />

          <ButtonHelper
            onClick={() => history.push('/forgot_password_2')}
            disabled={openError}
          >
            Продолжить
          </ButtonHelper>

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

export default RestorePasswordFirstPage;
