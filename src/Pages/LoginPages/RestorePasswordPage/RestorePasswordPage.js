import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import AlertHelper from "../../../Components/Alert/Alert";
import "./RestorePasswordPage.scss";

const RestorePasswordPage = () => {
  const history = useHistory();
  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    <div className="restore-password">
      <div className="restore-password-flexbox">
        <p className="header-text">Восстановление пароля</p>

        <TextField
          InputLabelProps={{
            shrink: true,
            className: "label",
          }}
          label="Почта"
          type="email"
          required={true}
          className="input"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => checkEmail()}
        />

        <Button
          className="restore-password-btn"
          variant="outlined"
          onClick={() => history.push("/second_password")}
        >
          Продолжить
        </Button>

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

export default RestorePasswordPage;
