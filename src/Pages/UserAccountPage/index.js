import React, { useState } from 'react';
import axios from 'axios';

import reviewIcon from '../../assets/icons/review.svg';
import moreInfoIcon from '../../assets/icons/more-info.svg';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';
import UserCard from '../../Components/UserCard';

import './UserAccountPage.scss';

const UserAccountPage = () => {
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const user = localStorage.getItem('user');

  const selfAppraiseHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/request`,
        {
          userId: user?.id
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      if (res.data?.statusCode === 200) {
        setAlert('success');
        setErrorText('Вы успешно запросили оценку на себя');
        setError(true);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Не удалось запросить оценку на себя');
      setError(true);
    }
  };

  return (
    <div className="user-account-page">
      <AuthorizedHeader title="Личный кабинет" />
      <div className="user-account-page-container">
        <UserCard user={user} darkMode />
        <div className="user-account-page-review">
          <div className="user-account-page-review-request">
            <h3 className="user-account-page-review-request-header">
              <img
                src={reviewIcon}
                alt="review icon"
                className="user-account-page-review-request-icon"
              />
              Обратная связь
            </h3>
            <hr className="user-account-page-review-request-hr" />

            <ButtonHelper
              className="user-account-page-review-request-button"
              onClick={selfAppraiseHandler}
            >
              Запросить отзыв на себя
            </ButtonHelper>
          </div>
          <div className="user-account-page-review-info">
            <h3 className="user-account-page-review-info-header">
              <img
                src={moreInfoIcon}
                alt="more info icon"
                className="user-account-page-review-info-icon"
              />
              Подробная информация
            </h3>
            <hr className="user-account-page-review-info-hr" />

            {/* <ButtonHelper className="user-account-page-review-info-button">
                Запросить
              </ButtonHelper> */}
            <ButtonHelper className="user-account-page-review-info-button">
              Посмотреть
            </ButtonHelper>
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

export default UserAccountPage;
