import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AllUsersTable from '../../Components/AllUsersTable';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import SimpleModal from '../../Components/SimpleModal';
import SimpleModalTableHelper from '../../Components/EditUserInfoModal';
import AllUsersUpdater from '../../Components/AllUsersUpdater';

import './AllUsersPage.scss';

const AllUsersPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [userToUpdateId, setUserToUpdateId] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user?.role === 'admin';

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
      if (String(e).split('code ')?.[1] === '400') {
        setAlert('warning');
        setError(true);
        window.setTimeout(() => history.push('/my'), 2000);
        setErrorText('Отказано в доступе');
      } else {
        setErrorText('Внутренняя ошибка');
        setAlert('warning');
        setError(true);
      }
    }
  };

  const toggleUser = async (userId, type) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/toggle-user`,
        {
          userId,
          type
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        if (type === 'delete') {
          setErrorText('Пользователь удален');
          setAlert('success');
        } else {
          setErrorText('Пользователь восстановлен');
          setAlert('success');
        }
        setError(true);
        getAllUsers();
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const getInfoSelectedUser = async (userId) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/get-info`,
        {
          userId
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setSelectedUser(res.data.user);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedUserID != null) {
      getInfoSelectedUser(selectedUserID);
    }
  }, [selectedUserID]);

  const OpenModalHandler = (id) => {
    setSelectedUserID(id);
  };

  const OpenUserUpdateModalHandler = (id) => {
    setUserToUpdateId(id);
  };

  return (
    <div className="users-main-container">
      <AuthorizedHeader title="Список пользователей" />
      <div className="users-body-container">
        <div className="users-table">
          {users.length > 0 ? (
            <AllUsersTable
              rows={users}
              toggleUser={toggleUser}
              onClickUser={OpenModalHandler}
              onUpdateUser={OpenUserUpdateModalHandler}
              isAdmin={isAdmin}
            />
          ) : null}
        </div>

        <SimpleModal
          open={!!selectedUserID}
          onClose={() => setSelectedUserID(null)}
        >
          <SimpleModalTableHelper
            selectedUser={selectedUser}
            onClose={() => setSelectedUserID(null)}
          />
        </SimpleModal>

        <SimpleModal
          open={!!userToUpdateId}
          onClose={() => setUserToUpdateId(null)}
        >
          <AllUsersUpdater
            users={users}
            userId={userToUpdateId}
            onClose={() => {
              setUserToUpdateId(null);
              getAllUsers();
            }}
          />
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

export default AllUsersPage;
