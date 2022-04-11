import React from 'react';

import AuthorizedHeader from '../../Components/AuthorizedHeader';
import reviewIcon from '../../assets/icons/review.svg';
import moreInfoIcon from '../../assets/icons/more-info.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import UserCard from '../../Components/UserCard';

import './UserAccountPage.scss';

const UserAccountPage = () => {
  const tempUser = {
    fullname: 'temp user',
    position: 'test test',
    workplace: 'Appraisers Plc'
  };

  return (
    <>
      <div className="user-account-page">
        <AuthorizedHeader title="Личный кабинет" />
        <div className="user-account-page-container">
          <UserCard user={tempUser} Color={['#000000', '#cfb389']} />
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

              <ButtonHelper className="user-account-page-review-request-button">
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
      </div>
    </>
  );
};

export default UserAccountPage;