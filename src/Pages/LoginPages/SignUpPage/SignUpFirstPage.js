import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import appLogo from '../../../assets/branding/logo.png';

import SignImage from '../../../Components/SignImage/SignImage.js';
import PasswordTextField from "../../../Components/PasswordTextField/PasswordTextField";
import "./SignUpFirstPage.scss";
import AlertHelper from "../../../Components/Alert/Alert";

const SignUpFirstPage = () => {
  const history = useHistory();
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState("");
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  const checkEmail = (e) => {
    if (!email.match(regexpEmail)) {
      setAlert("error");
      setErrorText(`Пример: jsmith@example.com`);
      setError(true);
    } else {
      setAlert("success");
      setErrorText(`Корректый E-mail`);
      setError(true);
    }
  };

  const checkRepeatPassword = () => {
    if (password !== repeatPassword) {
      setAlert("error");
      setErrorText("Пароли не совпадают!");
      setError(true);
      setRepeatPasswordError(true);
    } else {
      setAlert("success");
      setErrorText("Пароли совпадают!");
      setError(true);
      setRepeatPasswordError(false);
    }
  };

  const nextPage = () => {
    if (password === repeatPassword) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      history.push("/sign/up/2");
    } else { 
      checkRepeatPassword();
    }
  }

  return (
    <div className='first-page-sign-up'>
      <div className="left-first-page-sign-up">
        <div className="image-header-sign-up">
          <Link to='/' >
            <img
                src={appLogo}
                alt="logo"/>
          </Link>
        </div>
        <p className="header-text-1">Регистрация</p>
        <div className="input-fields-sign-up">
          <TextField
            InputLabelProps={{
              shrink: true,
              className: "label"
            }}
            label="Почта"
            className="input"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
          />
        </div>
        <div className="input-fields-sign-up">
          <PasswordTextField
            value={password}
            setValue={setPassword}
          />
        </div>
        <div className="input-fields-sign-up">
          <PasswordTextField
            value={repeatPassword}
            setValue={setRepeatPassword}
            label="Повторите пароль"
          />
        </div>
        <div className="sign-up">
          <Button
            className="sign-up-btn"
            variant="outlined"
            onClick={() => nextPage()}
          >
            Продолжить
          </Button>
        </div>
        <AlertHelper isOpen={openError} text={errorText} alertColor={alert} onClose={setError} />
        <div className="buttons-for-sign-up">
          <p>Есть аккаунт?</p>
          <Link to="/login">
            Войти
          </Link>
        </div>
      </div>
      <div className='rigth-sign-up'>
        <SignImage/>
      </div>
    </div>
  );
};

export default SignUpFirstPage;
