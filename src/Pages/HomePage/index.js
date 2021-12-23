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
    <>
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
          <form className="login-form">
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
              onClick={() => history.push('/forgot_password_2')}
              // disabled={openError}
              className="main-button-helper"
            >
              <p class="entrance">Войти</p>
            </ButtonHelper>
            <p class="restore">Забыли пароль?</p>
            {/* <NavLink to="/forgot_password" activeClassName="link-restore">
              Восcтановить
            </NavLink> */}
            <p class="link-restore"> Восcтановить</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default HomePage;
