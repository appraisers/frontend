import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CreateQuestion from '../CreateQuestion';
import DeleteQuestion from '../DeleteQuestion';
import InviteRegistration from '../InviteRegistration';
import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import BarChart from '../../Components/BarChart';
import usersTableIcon from '../../assets/icons/users-table-icon.svg';
import statusIcon from '../../assets/icons/status-icon.svg';

import './AccountPage.scss';

const AccountPage = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const getAllUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/top`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setTopUsers(res.data.data);
      }
    } catch (e) {
      setErrorText('Внутренняя ошибка');
      setAlert('warning');
      setError(true);
    }
  };

  useEffect(() => {
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMonthName = () => {
    const dateNow = new Date();
    const lastMonthDate = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() - 1
    );
    const monthlist = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ];
    return monthlist[lastMonthDate.getMonth()];
  };

  return (
    <div className="account-page-main">
      <AuthorizedHeader
        className="account-page-header"
        title="Личный кабинет"
      />
      <div className="account-page-body">
        <div className="account-page-left-menu">
          <div className="account-page-title">
            <h2>Администратор</h2>
          </div>
          <div className="account-page-body">
            <div className="account-page-all-users">
              <a href="/users" className="account-page-all-users-url">
                <img
                  src={usersTableIcon}
                  href="/my"
                  className="account-page-all-users-logo"
                  alt="account-page-all-users-logo"
                />
                Таблица пользователей
              </a>
            </div>
            <div className="account-page-item">
              <CreateQuestion />
            </div>
            <div className="account-page-item">
              <DeleteQuestion />
            </div>
            <div className="account-page-item">
              <InviteRegistration />
            </div>
            <div className="account-page-item">
              <a
                href="/appraise-statuses"
                className="users-grades-statuses-url"
              >
                <img
                  src={statusIcon}
                  className="user-grade-status-logo"
                  alt="users statuses page logo"
                />
                Таблица статусов оценок
              </a>
            </div>
          </div>
        </div>
        <div className="account-page-right-block">
          <h4>Топ пользователей за {getMonthName()}</h4>
          <div className="account-page-bar">
            {topUsers.length > 0 ? (
              <BarChart users={topUsers} />
            ) : (
              <h3>Список пуст!</h3>
            )}
          </div>
        </div>
      </div>

      <AlertHelper
        isOpen={openError}
        text={errorText}
        alertColor={alert}
        onClose={setError}
      />
    </div>
  );
};

export default AccountPage;
