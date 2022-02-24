import React, { useState, useEffect } from 'react';
import axios from 'axios';

import appraiseIcon from '../../assets/icons/appraise-icon.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';
import SimpleModal from '../SimpleModal';
import SelectHelper from '../SelectHelper';

import './AppraiseModalIcon.scss';

const AppraiseModalIcon = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [user, setUser] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const handleChange = (e) => {
    setSelectedData(e.target.value);
  };

  const userTable = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/all-invite-users`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setUser(res.data?.users);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    userTable();
  }, []);

  const inviteReview = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/review/invite_appraise`,
        {
          email: selectedData,
          userId
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        console.log('Приглашение отправлено');
        setOpen(false);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  return (
    <div className="appraise-main-container">
      <img
        src={appraiseIcon}
        onClick={() => setOpen(true)}
        className="appraise-user-logo"
        alt="appraise"
      />

      <SimpleModal open={open} onClose={() => setOpen(false)}>
        <div className="appraise-modal-main-container">
          <span>Выберите того, кто будет оценивать:</span>
          <SelectHelper
            data={user}
            selectedData={selectedData}
            onChange={handleChange}
          />

          <ButtonHelper
            onClick={inviteReview}
            className="appraise-modal-button"
          >
            <p>Сохранить</p>
          </ButtonHelper>
        </div>
      </SimpleModal>

      <AlertHelper
        isOpen={openError}
        text={errorText}
        alertColor={alert}
        onClose={setError}
      />
    </div>
  );
};

export default AppraiseModalIcon;
