import React, { useState, useEffect } from 'react';
import axios from 'axios';

import appraiseIcon from '../../assets/icons/appraise-icon.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';
import SimpleModal from '../SimpleModal';
import MultiSelectHelper from '../MultiSelectHelper';

import './AppraiseModalIcon.scss';

const AppraiseModalIcon = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const getUsersForTable = async () => {
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
        const selectUsersFormat = res.data?.users?.map((user) => ({
          value: user.email,
          label: user.fullname
        }));
        setUsers(selectUsersFormat);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const inviteReview = async () => {
    try {
      const emails = selectedData.map((item) => item.value);
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/review/invite_appraise`,
        {
          emails,
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

  useEffect(() => {
    getUsersForTable();
  }, []);

  return (
    <div className="appraise-main-container">
      <img
        src={appraiseIcon}
        onClick={() => setOpen(true)}
        className="appraise-user-logo"
        alt="appraise"
      />

      <SimpleModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedData(null);
        }}
      >
        <div className="appraise-modal-main-container">
          <MultiSelectHelper
            data={users}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            onClose={() => setOpen(false)}
            placeholder="Выберите оценивающего"
          />

          <ButtonHelper
            onClick={() => {
              inviteReview();
              setOpen(false);
            }}
            className="appraise-modal-button"
            disabled={selectedData == null}
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