import React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell,
  styled
} from '@material-ui/core';
import noDeletedIcon from '../../assets/icons/no-deleted-icon.svg';
import deletedIcon from '../../assets/icons/deleted-icon.svg';
import AppraiseModalIcon from '../AppraiseModalIcon';

import './AllUsersTable.scss';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const TableHelper = ({ rows, toggleUser, userOnClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
              <TableCell
                align="center"
                onClick={userOnClick}
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
