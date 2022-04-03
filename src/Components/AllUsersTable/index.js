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
import noDeletedIcon from '../../assets/icons/no-deleted-icon.svg';
import deletedIcon from '../../assets/icons/deleted-icon.svg';
import AppraiseModalIcon from '../AppraiseModalIcon';
import StyledTableRow from '../StyledTableRow';
import PencilIcon from '../../assets/icons/pencilIcon.svg';

import './AllUsersTable.scss';

const TableHelper = ({ rows, toggleUser, openUserInfoModal, userUpdate }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">Имя</TableCell>
            <TableCell align="center">Должность</TableCell>
            <TableCell align="center">Общий рейтинг</TableCell>
            <TableCell align="center">Отзывы</TableCell>
            <TableCell align="center">Дата последней оценки</TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell onClick={() => userUpdate(row.id)}>
                <img
                  src={PencilIcon}
                  className="update-users-icon"
                  alt="edit-pencil-icon"
                />
              </TableCell>
              <TableCell
                align="center"
                onClick={() => openUserInfoModal(row.id)}
                className="all-users-table-cell-username"
              >
                {row.fullname ?? '-'}
              </TableCell>
              <TableCell align="center">{row.position ?? '-'}</TableCell>
              <TableCell align="center">
                {Number.parseFloat(row.rating).toFixed(1) ?? '-'}
              </TableCell>
              <TableCell align="center">
                {row.numberOfCompletedReviews ?? '-'}
              </TableCell>
              <TableCell align="center">
                {row.updatedReviewAt
                  ? format(new Date(row.updatedReviewAt), 'dd-MM-yyyy HH:MM')
                  : '-'}
              </TableCell>
              <TableCell align="center">
                <AppraiseModalIcon userId={row.id} />
              </TableCell>
              <TableCell align="center">
                {row.deletedAt == null ? (
                  <img
                    src={noDeletedIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => toggleUser(row.id, 'delete')}
                  />
                ) : (
                  <img
                    src={deletedIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => toggleUser(row.id, 'restore')}
                  />
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHelper;
