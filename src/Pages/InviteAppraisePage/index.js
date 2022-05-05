import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import AlertHelper from '../../Components/Alert';
import AuthorizedHeader from '../../Components/AuthorizedHeader';
import UserCard from '../../Components/UserCard';

import './InviteAppraisePage.scss';

const InviteAppraisePage = () => {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const { userId } = useParams();
  const getUser = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/get-info`,
        {
          userId
        }
      );
      if (res.data?.statusCode === 200) {
        setUser(res.data?.user);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Пользователь не найден');
      setError(true);
      window.setTimeout(() => history.push('/my'), 2000);
    }
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="survey-invite-body">
      <AuthorizedHeader />
      <div className="survey-invite-container">
        <div className="survey-invite-description-container">
          <h1 className="survey-invite-description-header">
            Оцените работу и личные качества {user.fullname}.
          </h1>
          <p className="survey-invite-description">
            Оценка происходит в виде тестирования. Можно выбрать только один
            ответ на каждый вопрос. Если Вы не знаете, как ответить, выберите
            номер вопроса в пункте “Не знаю”. Отвечайте честно. Опрос анонимный.
          </p>

          <NavLink
            to={`/appraise/${userId}`}
            className="survey-invite-survey-link"
          >
            <span className="survey-invite-link-to-survey">Пройти опрос</span>
          </NavLink>

          <AlertHelper
            isOpen={openError}
            text={errorText}
            alertColor={alert}
            onClose={setError}
          />
        </div>
        <UserCard user={user} darkMode={false} />
      </div>
    </div>
  );
};

export default InviteAppraisePage;