import React, { useState } from 'react';
import axios from 'axios';

import { FormControlLabel, Checkbox } from '@material-ui/core';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell
} from '@material-ui/core';
import RatingPieChart from '../RatingPieChart';
import ButtonHelper from '../ButtonHelper';
import StyledTableRow from '../StyledTableRow';
import AlertHelper from '../Alert';

import './EditUserInfoModal.scss';

const EditUserInfoModal = ({ selectedUser, onReload, onClose }) => {
  const [checked, setChecked] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');

  const toggleHandler = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/user/toggle-show-info`,
        {
          userId: selectedUser.id
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setAlert('success');
        setErrorText('Успешно!');
        setError(true);
        onReload(selectedUser.id);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Не удалось переключить!');
      setError(true);
    }

    setChecked(!selectedUser.showInfo);
  };

  if (selectedUser == null) {
    return null;
  }

  return (
    <div>
      <div className="simple-modal-user-popup">
        <div className="simple-modal-users-info">
          <h1 className="simple-modal-users-username">
            {selectedUser.fullname}
          </h1>
          <h3 className="simple-modal-users-header">Прохождение опросов</h3>

          {selectedUser.review?.length > 0 ? (
            <TableContainer
              component={Paper}
              className="simple-modal-table-container"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      className="simple-modal-table-header"
                      align="center"
                    >
                      Имя
                    </TableCell>
                    <TableCell
                      className="simple-modal-table-header"
                      align="center"
                    >
                      Дата
                    </TableCell>
                    <TableCell
                      className="simple-modal-table-header"
                      align="center"
                    >
                      Рейтинг
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedUser.review.map((review) => (
                    <StyledTableRow key={review.id}>
                      <TableCell
                        align="center"
                        className="all-users-table-cell-username"
                      >
                        {review.description}
                      </TableCell>
                      <TableCell align="center">
                        {review.createdAt
                          ? format(
                              new Date(review.createdAt),
                              'dd-MM-yyyy HH:MM'
                            )
                          : '-'}
                      </TableCell>
                      <TableCell align="center">
                        {review.ratingSummary
                          ? review.ratingSummary.toFixed(1)
                          : '-'}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <h1>Нет отзывов</h1>
          )}
        </div>

        <div className="simple-modal-user-pie-chart">
          <RatingPieChart user={selectedUser} />
        </div>

        <div className="available-data-check">
          <FormControlLabel
            control={
              <Checkbox
               checked={checked}
               onClick={toggleHandler}
              />}
            label="Просмотр подробной информации"
          />
          <ButtonHelper className="simple-modal-user-exit" onClick={onClose}>
            Назад
          </ButtonHelper>
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

export default EditUserInfoModal;
