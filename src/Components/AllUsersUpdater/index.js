import React, { useState } from 'react';
import ButtonHelper from '../ButtonHelper';
import InputHelper from '../InputHelper';

import './AllUsersUpdater.scss';

const AllUsersUpdater = ({ users, userId, onClose }) => {
  const selectedUser = users.filter((e) => {
    return e.id === userId;
  });

  const [fullName, setFullName] = useState(selectedUser[0].fullname);
  const [email, setEmail] = useState(selectedUser[0].email);
  const [position, setPosition] = useState(selectedUser[0].position);
  const [company, setCompany] = useState(selectedUser[0].company);
  const [role, setRole] = useState(selectedUser[0].role);

  const UpdateUserHandler = (e) => {
    // const updatedUser = {
    //   fullName: fullName,
    //   email: email,
    //   position: position,
    //   company: company,
    //   role: role
    // };
    onClose();
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
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

        <InputHelper
          label="Роль"
          type="text"
          className="all-users-updater-form-input"
          variant="outlined"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <ButtonHelper
          onClick={UpdateUserHandler}
          className="all-users-updater-submit"
        >
          Сохранить
        </ButtonHelper>
      </div>
    </div>
  );
};

export default AllUsersUpdater;
