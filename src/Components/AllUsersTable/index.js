import React from 'react';
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

const TableHelper = ({ rows }) => {
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <TableCell align="center">{row.fullname}</TableCell>
              <TableCell align="center">{row.position}</TableCell>
              <TableCell align="center">{row.rating}</TableCell>
              <TableCell align="center">{row.numberOfCompletedReviews}</TableCell>
              <TableCell align="center">{row.updatedReviewAt}</TableCell>
              <TableCell align="center">
                <AppraiseModalIcon userId={row.id} />
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableHelper;
