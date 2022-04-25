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
import restoreIcon from '../../assets/icons/no-deleted-icon.svg';
import deleteIcon from '../../assets/icons/deleted-icon.svg';
import pencilIcon from '../../assets/icons/pencilIcon.svg';
import AppraiseModalIcon from '../AppraiseModalIcon';
import StyledTableRow from '../StyledTableRow';

import './AllUsersTable.scss';

const TableHelper = ({ rows, toggleUser, onClickUser, onUpdateUser }) => {
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
              <TableCell onClick={() => onUpdateUser(row.id)}>
                <img
                  src={pencilIcon}
                  className="update-users-icon"
                  alt="edit-pencil-icon"
                />
              </TableCell>
              <TableCell
                align="center"
                onClick={() => onClickUser(row.id)}
                className="all-users-table-cell-username"
              >
                {row.fullname ?? '-'}
              </TableCell>
              <TableCell align="center">{row.position ?? '-'}</TableCell>
              <TableCell align="center">
                {row.rating? Number.parseFloat(row.rating).toFixed(1) : '-'}
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
                {row.deletedAt != null ? (
                  <img
                    src={restoreIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => toggleUser(row.id, 'restore')}
                  />
                ) : (
                  <img
                    src={deleteIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => toggleUser(row.id, 'delete')}
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
