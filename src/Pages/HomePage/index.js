import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import AlertHelper from '../../Components/Alert/Alert';
import Header from "../../Components/MainHeader";
import BackgroundImage from "../../Components/BackgroundImage";
import InputHelper from "../../Components/InputHelper";
import ButtonHelper from "../../Components/ButtonHelper";


import "./HomePage.scss";

const HomePage = () => {
  const history = useHistory();
  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const RegexPassword = /(\w|@)+/;
  const [email, setEmail] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [password, setPassword] = useState('');
 
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
      <Header />

      <BackgroundImage />

      <div className="wrapper-main">
        <div className="wrapper-left">
          <span className="greeting-main">Собирайте обратную связь в формате опроса по методу «360 градусов»</span>
          <p className="description-main">
             Профессиональные качества сотрудника оценивают все, с кем он работает: от подчиненных до руководителей
          </p>
        </div>
         <div className="wrapper-Right">
          <form className = "loginForm">
            <p className="loginForm_ToComeIn">Вход</p>
          <InputHelper
            label="Почта"
            type="email"
            className="input-helper"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
            
          />
          <InputHelper
            label="Пароль"
            type="password"
            className="input-helper"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={checkPassword}
          />


          <ButtonHelper
            onClick={() => history.push('/forgot_password_2')}
            disabled={openError}
            className="main-button-helper"
          >
           <p class="entrance">Войти</p> 
          </ButtonHelper>
          <p class ="restore">Забыли пароль</p>
          {/* <NavLink to="#" activeClassName="link_restore">
               Востановить
               </NavLink> */}
              {/* Не получилось сделать "Восстановить" в формате ссылки, поэтому пока просто текст" */}
              <p class="link_restore"> Востановить</p>
              
          <AlertHelper
            isOpen={openError}
            text={errorText}
            alertColor={alert}
            onClose={setError}
          />
            
          </form>
        </div> 
      </div>
    </>
  );
};

export default HomePage;
