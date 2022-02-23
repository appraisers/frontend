import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';

import HeaderLogotype from '../../Components/HeaderLogo';
import AlertHelper from '../../Components/Alert';
import BackgroundImage from '../../Components/BackgroundImage';
import ButtonHelper from '../../Components/ButtonHelper';
import InputHelper from '../../Components/InputHelper';
import InputPassword from '../../Components/InputPassword';

import './RegistrationPage.scss';

const RestorePasswordSecondPage = () => {
  const history = useHistory();
  const RegexPassword = /(\w|@)+/;
  const token = window.location.pathname.split('/')?.[2];

  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const handleCheckPassword = () => {
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

  const handleCheckRepeatPassword = () => {
    if (
      password.length &&
      repeatPassword.length &&
      password === repeatPassword
    ) {
      setAlert('success');
      setErrorText(`Пароли совпадают`);
      setError(true);
    } else {
      setAlert('error');
      setErrorText(`Пароли не совпадают`);
      setError(true);
    }
  };

  const handleSubmit = async () => {
    if (
      password.length &&
      repeatPassword.length &&
      password === repeatPassword
    ) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/registration`,
          {
            fullname,
            password,
            token
          }
        );
        if (res.data?.statusCode === 200) {
          setAlert('success');
          setErrorText(`Пользователь успешно создан`);
          setError(true);
          window.setTimeout(() => history.push('/'), 3000);
        } else {
          setAlert('warning');
          setErrorText('Ошибка регистрации');
          setError(true);
        }
      } catch (e) {
        setAlert('warning');
        setErrorText('Внутренняя ошибка сервера');
        setError(true);
      }
    }
  };

  if (!token) {
    history.push('/');
  }

  return (
    <div>
      <HeaderLogotype />
      <BackgroundImage />

      <div className="registration-main-container">
        <p className="header-text">Регистрация</p>

        <div className='fullname-container'>
          <InputHelper
            label="Полное имя"
            value={fullname}
            onChange={e => setFullname(e.target.value)}
          />
        </div>

        <div className="password-first-container">
          <InputPassword
            label="Пароль"
            value={password}
            onChange={setPassword}
            onBlur={handleCheckPassword}
          />
        </div>

        <div className="password-second-container">
          <InputPassword
            label="Повтор пароля"
            value={repeatPassword}
            onChange={setRepeatPassword}
            onBlur={handleCheckRepeatPassword}
          />
        </div>

        <div className="create-account-button">
          <ButtonHelper onClick={handleSubmit}>
            <p className="create-account-text">Создать аккаунт</p>
          </ButtonHelper>
        </div>

        <div className="text-after-button">
          <p className="is-account-text">Есть аккаунт?</p>{' '}
          <NavLink to="/" className="login-link">
            <span className="login-link-text">Войти</span>
          </NavLink>
        </div>

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

export default RestorePasswordSecondPage;
