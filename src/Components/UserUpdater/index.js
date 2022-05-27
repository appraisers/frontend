import React, { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel } from '@material-ui/core';

import ButtonHelper from '../ButtonHelper';
import AlertHelper from '../Alert';
import InputHelper from '../InputHelper';
import SelectHelper from '../SelectHelper';

import './UserUpdater.scss';

const UserUpdater = ({ users, userId, onClose }) => {
  const selectedUser = users.filter((e) => {
    return e.id === userId;
  });

  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [fullname, setFullname] = useState(selectedUser[0].fullname);
  const [email, setEmail] = useState(selectedUser[0].email);
  const [company, setCompany] = useState(selectedUser[0].workplace);
  const [position, setPosition] = useState({ value: selectedUser[0].position });
  const [role, setRole] = useState({ value: selectedUser[0].role });

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

  const updateUserHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/update`,
        {
          id: userId,
          fullname,
          position: position.value,
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
        window.setTimeout(() => onClose(), 1000);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const roleOptions = [
    { value: 'user', label: 'Пользователь' },
    { value: 'moderator', label: 'Модератор' },
    { value: 'admin', label: 'Админ' }
  ];

  const positionOptions = [
    { value: 'junior developer', label: 'Джуниор  разработчик' },
    { value: 'middle developer', label: 'Мидл разработчик' },
    { value: 'senior developer', label: 'Сеньйор разработчик' },
    { value: 'tester', label: 'Тестеровщик' },
    { value: 'boss', label: 'Босс' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'default', label: 'По умолчанию' }
  ];

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
          label="Организация"
          type="text"
          className="all-users-updater-form-input"
          variant="outlined"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <FormControl>
          <InputLabel className="select-helper-label">Должность</InputLabel>
          <SelectHelper
            data={positionOptions}
            selectedData={position}
            onChange={(e) => setPosition(e.target)}
            className="all-users-updater-select-helper"
          />
        </FormControl>

        {isAdmin && (
          <FormControl>
            <InputLabel className="select-helper-label">Pоль</InputLabel>
            <SelectHelper
              data={roleOptions}
              selectedData={role}
              onChange={(e) => setRole(e.target)}
              className="all-users-updater-select-helper"
            />
          </FormControl>
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

export default UserUpdater;
