import React from 'react';

import AuthorizedHeader from '../../Components/AuthorizedHeader';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableCell
} from '@material-ui/core';
import StyledTableRow from '../../Components/StyledTableRow';

import './UserAppraiseStatus.scss';

const UserAppraiseStatus = () => {
  const DUMMY_USERS = [
    {
      id: 1,
      name: 'Алексей Попов',
      gradedBy: 'Матвей Степанов',
      date: '10:45 23.03.2011',
      status: 'Оценено'
    },
    {
      id: 2,
      name: 'Кирилл Иванов',
      gradedBy: 'Данил Морозов',
      date: '15:45 28.12.2021',
      status: 'Не оценено'
    },
    {
      id: 3,
      name: 'Сергей Васильев',
      gradedBy: 'Станислав Козлов',
      date: '18:05 08.09.2021',
      status: 'Оценено'
    },
    {
      id: 4,
      name: 'Алексей Семёнов',
      gradedBy: 'Леонид Михайлов ',
      date: '15:04 28.10.2017',
      status: 'Не оценено'
    }
  ];
  return (
    <div className="appraise-status-container">
      <AuthorizedHeader title="Таблица статусов оценок" />
      <div className="appraise-status-body-container">
        <div className="appraise-status-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Имя</TableCell>
                  <TableCell align="center">Oценивающий</TableCell>
                  <TableCell align="center">Дата</TableCell>
                  <TableCell align="center">Cтатус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DUMMY_USERS &&
                  DUMMY_USERS.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell align="center">{row.name ?? '-'}</TableCell>
                      <TableCell align="center">
                        {row.gradedBy ?? '-'}
                      </TableCell>
                      <TableCell align="center">{row.date ?? '-'}</TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color:
                            row.status === 'Оценено' ? '#32a834' : '#f50717',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.status ?? '-'}
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default UserAppraiseStatus;