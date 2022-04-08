import React from 'react';
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

import './EditUserInfoModal.scss';

const EditUserInfoModal = ({ selectedUser, onClose }) => {
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

        <ButtonHelper className="simple-modal-user-exit" onClick={onClose}>
          Назад
        </ButtonHelper>
      </div>
    </div>
  );
};

export default EditUserInfoModal;
