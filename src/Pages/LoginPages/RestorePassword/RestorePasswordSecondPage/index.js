import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import AlertHelper from "../../../../Components/Alert/Alert";
import "./RestorePasswordSecondPage.scss";

const RestorePasswordSecondPage = () => {
  const history = useHistory();
  const RegexPassword = /(\w|@)+/;

  const [password, setPassword] = useState('');
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const checkPassword = (pwd) => {
    if (!password.match(RegexPassword)) {
      setAlert('error');
      setErrorText(`Пример: myname@360`);
      setError(true);
    } else {
      setAlert('success');
      setErrorText(`Корректый Пароль`);
      setError(true);
    }
  };

  return (
    <>
      <BackgroundImage />
      <div className="second-password">
        <div className="second-password-flexbox">
          <p className="header-text">Восстановление пароля</p>

          <TextField
            InputLabelProps={{
              shrink: true,
              className: 'label'
            }}
            label="Новый Пароль"
            type="password"
            className="input"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={checkPassword}
          />

          <TextField
            InputLabelProps={{
              shrink: true,
              className: 'label'
            }}
            label="Повтор Пароль"
            type="password"
            className="input"
            variant="outlined"
            value={password}
            onChange={(pwd) => setPassword(pwd.target.value)}
            onBlur={checkPassword}
          />

          <Button
            className="second-password-btn"
            variant="outlined"
            onClick={() => history.push('/')}
          >
            Восстановить
          </Button>

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

export default RestorePasswordSecondPage;
