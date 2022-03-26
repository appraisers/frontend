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
import RatingPieChart from '../RatingPieChart';
import ButtonHelper from '../ButtonHelper';

import './SimpleModalUsers.scss';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const SimpleModalTableHelper = (props) => {
  const raters = props.users;
  return (
    <>
      <div className="simple-modal-user-popup">
        <div className="simple-modal-users-info">
          <h1 className="simple-modal-users-username">Петров Петр Петрович</h1>
          <h3>Прохождение опросов</h3>

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
                    дата
                  </TableCell>
                  <TableCell
                    className="simple-modal-table-header"
                    align="center"
                  >
                    рейтинг
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {raters.map((rater) => (
                  <StyledTableRow key={rater.id}>
                    <TableCell
                      align="center"
                      className="all-users-table-cell-username"
                    >
                      {rater['name']}
                    </TableCell>
                    <TableCell align="center">{rater['date']}</TableCell>
                    <TableCell align="center">
                      {Number.parseFloat(rater['score']).toFixed(1)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="simple-modal-user-pie-chart">
          <RatingPieChart data={raters} />
        </div>

        <ButtonHelper
          className="simple-modal-user-exit"
          onClick={props.onClose}
        >
          Назад
        </ButtonHelper>
      </div>
    </>
  );
};

export default SimpleModalTableHelper;
