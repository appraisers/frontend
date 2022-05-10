import React, { useState } from 'react';
import axios from 'axios';

import appraiseIcon from '../../assets/icons/appraise-icon.svg';
import ButtonHelper from '../../Components/ButtonHelper';
import AlertHelper from '../../Components/Alert';
import SimpleModal from '../SimpleModal';
import MultiSelectHelper from '../MultiSelectHelper';

import './AppraiseModalIcon.scss';

const AppraiseModalIcon = ({ userId, users }) => {
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [open, setOpen] = useState(false);
  const preparedUsers = users?.map((user) => ({
    value: user.email,
    label: user.fullname
  }));
  const [selectedData, setSelectedData] = useState([]);

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
        setAlert('success');
        setErrorText('Приглашение отправлено!');
        setError(true);
        window.setTimeout(() => {
          setOpen(false);
          setSelectedData([]);
        }, 2000);
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

      <SimpleModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedData([]);
        }}
      >
        <div className="appraise-modal-main-container">
          <MultiSelectHelper
            data={preparedUsers}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
            onClose={() => setOpen(false)}
            placeholder="Выберите оценивающего"
          />

          <ButtonHelper
            onClick={() => {
              inviteReview();
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
