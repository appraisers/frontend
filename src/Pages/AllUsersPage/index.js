import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import AllUsersTable from '../../Components/AllUsersTable';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import SimpleModal from '../../Components/SimpleModal';
import SimpleModalTableHelper from '../../Components/SimpleModalUsers';
import AllUsersUpdater from '../../Components/AllUsersUpdater';

import './AllUsersPage.scss';

const AllUsersPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [userToUpdateId, setUserToUpdateId] = useState(null);

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
          setAlert('warning');
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

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OpenModalHandler = (id) => {
    setSelectedUserID(id);
  };

  const OpenUserUpdateModalHandler = (id) => {
    setUserToUpdateId(id);
  };

  const fakeRaters = [
    {
      id: 1,
      name: 'Макаров Андрей Александрович',
      date: '2021.6.5 8:25',
      score: 4.5
    },
    {
      id: 2,
      name: 'Додо Пицца Таганрог',
      date: '2022.1.25 4:05',
      score: 3.8
    },
    {
      id: 3,
      name: 'Макаров Гарнов Александрович',
      date: '2019.11.29 12:33',
      score: 5.0
    },
    {
      id: 4,
      name: 'Андрей Макаров Александрович',
      date: '2021.15.01 10:17',
      score: 4.2
    },
    {
      id: 5,
      name: 'Дмитри Махсимович',
      date: '2022.04.20 6:28',
      score: 2.5
    }
  ];

  return (
    <div className="users-main-container">
      <AuthorizedHeader title="Список пользователей" />
      <div className="users-body-container">
        <div className="users-table">
          {users.length > 0 ? (
            <AllUsersTable
              rows={users}
              toggleUser={toggleUser}
              userOnClick={OpenModalHandler}
              onUserUpdate={OpenUserUpdateModalHandler}
           />
          ) : null}
        </div>

        <SimpleModal
          open={!!selectedUserID}
          onClose={() => setSelectedUserID(null)}
        >
          <SimpleModalTableHelper
            users={fakeRaters}
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
            onClose={() => setUserToUpdateId(null)}
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
