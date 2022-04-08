import React, { useState } from 'react';
import axios from 'axios';

import ButtonHelper from '../ButtonHelper';
import AlertHelper from '../Alert';
import InputHelper from '../InputHelper';

import './AllUsersUpdater.scss';

const AllUsersUpdater = ({ users, userId, onClose }) => {
  const selectedUser = users.filter((e) => {
    return e.id === userId;
  });

  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [fullname, setFullname] = useState(selectedUser[0].fullname);
  const [email, setEmail] = useState(selectedUser[0].email);
  const [position, setPosition] = useState(selectedUser[0].position);
  const [company, setCompany] = useState(selectedUser[0].workplace);
  const [role, setRole] = useState(selectedUser[0].role);

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const updateUserHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/update`,
        {
          id: userId,
          fullname,
          position,
          email,
          workplace: company,
          role: isAdmin ? role : null
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setErrorText('Данные успешно отредактированн');
        setAlert('success');
        setError(true);
        window.setTimeout(() => onClose(), 2000);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  return (
    <div className="all-users-updater-container">
      <span className="all-users-updater-exit" onClick={onClose}>
        X
      </span>
      <h3 className="all-users-updater-description">
        Редактировать информацию о пользователе
      </h3>

      <div className="all-users-updater-form">
        <InputHelper
          label="Полное имя"
          type="text"
          className="all-users-updater-form-input"
          variant="outlined"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <InputHelper
          label="Почта"
          type="email"
          className="all-users-updater-form-input"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputHelper
          label="Должность"
          type="text"
          className="all-users-updater-form-input"
          variant="outlined"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        <InputHelper
          label="Организация"
          type="text"
          className="all-users-updater-form-input"
          variant="outlined"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        {isAdmin && (
          <InputHelper
            label="Роль"
            type="text"
            className="all-users-updater-form-input"
            variant="outlined"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        )}

        <ButtonHelper
          onClick={updateUserHandler}
          className="all-users-updater-submit"
        >
          Сохранить
        </ButtonHelper>

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

export default AllUsersUpdater;
