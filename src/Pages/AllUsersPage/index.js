import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AllUsersTable from '../../Components/AllUsersTable';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';

import './AllUsersPage.scss';

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/all-users`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setUsers(res.data.users);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="users-main-container">
      <AuthorizedHeader title="Список пользователей" />
      <div className="users-body-container">
        <div className="users-table">
          {users.length > 0 ? <AllUsersTable rows={users} /> : null}
        </div>

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

export default AllUsersPage;
