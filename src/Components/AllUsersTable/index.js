import React, { useState } from 'react';
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
import SimpleModal from '../SimpleModal';
import AppraiseModalIcon from '../AppraiseModalIcon';
import StyledTableRow from '../StyledTableRow';
import ButtonHelper from '../ButtonHelper';

import './AllUsersTable.scss';

const AllUsersTable = ({ rows, toggleUser, onClickUser, onUpdateUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);

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
                {row.rating ? Number.parseFloat(row.rating).toFixed(1) : '-'}
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
                <AppraiseModalIcon userId={row.id} users={rows} />
              </TableCell>
              <TableCell align="center">
                {row.deletedAt != null ? (
                  <img
                    src={restoreIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => setSelectedUser(row)}
                  />
                ) : (
                  <img
                    src={deleteIcon}
                    className="toggle-user-logo"
                    alt="appraise"
                    onClick={() => setSelectedUser(row)}
                  />
                )}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <SimpleModal open={!!selectedUser} onClose={() => setSelectedUser(null)}>
        <div className="delete-user-container">
          <p className="delete-user-description">
            Вы уверены что хотите{' '}
            {selectedUser?.deletedAt != null ? 'восстановить' : 'удалить'}{' '}
            пользователя?
          </p>
          <div className="delete-user-buttons">
            <ButtonHelper
              className="delete-user-left"
              onClick={() => setSelectedUser(null)}
            >
              Назад
            </ButtonHelper>
            <ButtonHelper
              className="delete-user-right"
              onClick={() => {
                toggleUser(
                  selectedUser.id,
                  selectedUser.deletedAt != null ? 'restore' : 'delete'
                );
                setSelectedUser(null);
              }}
            >
              Подтвердить
            </ButtonHelper>
          </div>
        </div>
      </SimpleModal>
    </TableContainer>
  );
};

export default AllUsersTable;
