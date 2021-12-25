import React, { useState } from 'react';
import { useHistory, NavLink } from 'react-router-dom';

import Header from '../../Components/MainHeader';
import BackgroundImage from '../../Components/BackgroundImage';
import InputHelper from '../../Components/InputHelper';
import ButtonHelper from '../../Components/ButtonHelper';

import './HomePage.scss';

const HomePage = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <Header />

      <BackgroundImage />

      <div className="wrapper-main">
        <div className="wrapper-left">
          <span className="greeting-main">
            Собирайте обратную связь в формате опроса по методу «360 градусов»
          </span>
          <p className="description-main">
            Профессиональные качества сотрудника оценивают все, с кем он
            работает: от подчиненных до руководителей
          </p>
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
            <ButtonHelper
              // onClick={() => history.push('/my')}
              // disabled={openError}
              className="main-button-helper"
            >
              <p className="entrance">Войти</p>
            </ButtonHelper>
            <p className="restore">Забыли пароль?</p>
            <NavLink to="/forgot_password">
              <span className="link-restore">Восcтановить</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
