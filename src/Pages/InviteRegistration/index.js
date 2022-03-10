import React, { useState } from 'react';
import axios from 'axios';

import inviteIcon from '../../assets/icons/invite-icon.svg';
import AlertHelper from '../../Components/Alert';
import ButtonHelper from '../../Components/ButtonHelper';
import InputHelper from '../../Components/InputHelper';
import SimpleModal from '../../Components/SimpleModal';

import './InviteRegistration.scss';

const InviteRegistration = () => {
  const regexpEmail =
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const checkEmail = () => {
    if (!email.match(regexpEmail)) {
      setAlert('error');
      setErrorText(`Пример: jsmith@example.com`);
      setError(true);
      return false;
    }

    return true;
  };

  const sendInvitation = async () => {
    if (checkEmail(email)) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_SERVER_ENDPOINT}/user/invite`,
          {
            email
          }
        );
        if (res.data?.statusCode === 200) {
          setAlert('success');
          setErrorText(`Приглашение отправлено`);
          setError(true);
          setOpen(false);
          setEmail('');
        }
      } catch (e) {
        setAlert('warning');
        setErrorText('Внутренняя ошибка сервера');
        setError(true);
      }
    }
  };

  return (
    <div className="invite-registration-main">
      <img
        src={inviteIcon}
        onClick={() => setOpen(true)}
        className="invite-registration-logo"
        alt="invite-registration-logo"
      />
      <span
        onClick={() => setOpen(true)}
        className="invite-registration-main-span"
      >
        Пригласить пользователя
      </span>
      <div className="invite-registration-body">
        <SimpleModal
          open={open}
          onClose={() => {
            setOpen(false);
            setEmail('');
          }}
        >
          <div className="invite-registration-modal-main-container">
            <span className="invite-registration-textfield-span">
              Введите электронную почту
            </span>
            <div className="invite-registration-textfield">
              <InputHelper
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="invite-registration-button-div">
              <ButtonHelper
                onClick={sendInvitation}
                className="invite-registration-button"
              >
                <p>Пригласить</p>
              </ButtonHelper>
            </div>
          </div>
        </SimpleModal>
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

export default InviteRegistration;
