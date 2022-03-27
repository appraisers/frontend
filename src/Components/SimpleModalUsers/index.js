import React from 'react';
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

import './SimpleModalUsers.scss';

const SimpleModalTableHelper = (props, userOnClick) => {
  const users = props.users;
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
                {users.map((user) => (
                  <StyledTableRow key={user.id} onClick={() => userOnClick(user.id)}>
                    <TableCell
                      align="center"
                      className="all-users-table-cell-username"
                    >
                      {users.name}
                    </TableCell>
                    <TableCell align="center">{user.date}</TableCell>
                    <TableCell align="center">
                      {Number.parseFloat(user.score).toFixed(1)}
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        <div className="simple-modal-user-pie-chart">
          <RatingPieChart data={users} />
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
