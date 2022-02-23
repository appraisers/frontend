import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Header from '../../../Components/MainHeader';
import AlertHelper from '../../../Components/Alert';
import BackgroundImage from '../../../Components/BackgroundImage';
import InputHelper from '../../../Components/InputHelper';
import ButtonHelper from '../../../Components/ButtonHelper';

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
      return false;
    }

    setAlert('success');
    setErrorText(`Корректый E-mail`);
    setError(true);
    return true;
  };

  const handleSubmit = async () => {
    if (checkEmail(email)) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/forgot_password`,
          {
            email
          }
        );
        if (res.data?.statusCode === 200) {
          setAlert('success');
          setErrorText(`Письмо на восстановление успешно отправлено`);
          setError(true);
          window.setTimeout(() => history.push('/'), 3000);
        } else {
          setAlert('warning');
          setErrorText('Пользователь с такой почтой не найден');
          setError(true);
        }
      } catch (e) {
        setAlert('warning');
        setErrorText('Внутренняя ошибка сервера');
        setError(true);
      }
    }
  };

  return (
    <div>
      <Header />

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
            required
          />

          <ButtonHelper onClick={handleSubmit}>Продолжить</ButtonHelper>

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

export default RestorePasswordFirstPage;
