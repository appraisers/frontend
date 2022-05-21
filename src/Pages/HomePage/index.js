import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from '../../Components/MainHeader';
import BackgroundImage from '../../Components/BackgroundImage';
import InputHelper from '../../Components/InputHelper';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';

import './HomePage.scss';

const HomePage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const loginUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/auth/login`,
        {
          email,
          password
        }
      );
      if (res.data?.statusCode === 200) {
        const token = res.data?.authToken;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(res.data?.user));
        history.push('/my');
      }
    } catch (e) {
      if (String(e).split('code ')?.[1] === '403') {
        setAlert('warning');
        setErrorText('Пользователь удален');
        setError(true);
      } else {
        setAlert('warning');
        setErrorText('Неправильный E-mail или пароль');
        setError(true);
      }
    }
  };

  return (
    <div>
      <Header withButton />

      <BackgroundImage />

      <div className="wrapper-main">
        <div className="wrapper-left">
          <span className="greeting-main">
            Собирайте обратную связь в формате опроса по методу «360 градусов»
          </span>
          <span className="description-main">
            Профессиональные качества сотрудника оценивают все, с кем он
            работает: от подчиненных до руководителей
          </span>
        </div>
        <div className="wrapper-right">
          <div className="login-form">
            <p className="login-form-come-in">Вход</p>
            <InputHelper
              label="Почта"
              type="email"
              className="input-helper"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputHelper
              label="Пароль"
              type="password"
              className="input-helper"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ButtonHelper onClick={loginUser} className="main-button-helper">
              <p className="entrance">Войти</p>
            </ButtonHelper>
            <p className="restore">Забыли пароль?</p>
            <NavLink to="/forgot_password" className="restore-link">
              <span className="link-restore">Восcтановить</span>
            </NavLink>
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

export default HomePage;
