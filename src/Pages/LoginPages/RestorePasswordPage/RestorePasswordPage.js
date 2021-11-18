import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import appLogo from '../../../assets/branding/logo.png';
import AlertHelper from "../../../Components/Alert/Alert";
import SignImage from '../../../Components/SignImage/SignImage.js';
import "./RestorePasswordPage.scss";

const RestorePasswordPage = () => {
  const history = useHistory();
  const regexpEmail = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState("");
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState("");

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

  return (
    <div className='restore-password'>
      <div className="left-restore-password">
        <div className="image-header-restore-password">
          <Link to='/' >
            <img
              src={appLogo}
              alt="logo"/>
          </Link>
        </div>
        <p className="header-text-1">Забыли пароль?</p>
        <div className="input-fields-restore-password">
          <TextField
            InputLabelProps={{
              shrink: true,
              className: "label"
            }}
            label="Почта"
            type="email"
            className="input"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => checkEmail()}
          />
        </div>
        <div className="restore-password-for-button">
          <Button
            className="restore-password-btn"
            variant="outlined"
            onClick={() => history.push("/sign/up/2")}
          >
            Восстановить пароль
          </Button>
        </div>
        <div className="buttons-for-restore-password">
          <p>Нет аккаунта?</p>
          <Link to="/sign/up">
            Создать аккаунт
          </Link>
        </div>
      </div>
      <AlertHelper isOpen={openError} text={errorText} alertColor={alert} onClose={setError} />
      <div className='rigth-restore-password'>
        <SignImage/>
      </div>
    </div>
  );
};

export default RestorePasswordPage;
