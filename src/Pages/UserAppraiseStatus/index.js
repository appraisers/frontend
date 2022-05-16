import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AuthorizedHeader from '../../Components/AuthorizedHeader';
import SelectHelper from '../../Components/SelectHelper';
import AlertHelper from '../../Components/Alert';
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
  const [users, setUsers] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [rater, setRater] = useState({
    id: 1,
    value: 'Алексей Попов',
    label: 'Матвей Степанов',
    date: '10:45 23.03.2011',
    status: 'Оценено'
  });
  const [ratedUser, setRatedUser] = useState({
    id: 4,
    value: 'Алексей Семёнов',
    label: 'Леонид Михайлов ',
    date: '15:04 28.10.2017',
    status: 'Не оценено'
  });

  const [sortType, setSortType] = useState({
    value: 'lastMonth',
    label: 'Последний месяц'
  });

  const getAllUsers = async (filter) => {
    try {
      const preparedFilter = filter == null ? '' : `?${filter}=desc`;
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/appraise/get-appraises${preparedFilter}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setUsers(res.data.users);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getAllUsers(sortType.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DUMMY_USERS = [
    {
      id: 1,
      value: 'Алексей Попов',
      label: 'Матвей Степанов',
      date: '10:45 23.03.2011',
      status: 'Оценено'
    },
    {
      id: 2,
      value: 'Кирилл Иванов',
      label: 'Данил Морозов',
      date: '15:45 28.12.2021',
      status: 'Не оценено'
    },
    {
      id: 3,
      value: 'Сергей Васильев',
      label: 'Станислав Козлов',
      date: '18:05 08.09.2021',
      status: 'Оценено'
    },
    {
      id: 4,
      value: 'Алексей Семёнов',
      label: 'Леонид Михайлов ',
      date: '15:04 28.10.2017',
      status: 'Не оценено'
    }
  ];

  const sortData = [
    { value: 'lastMonth', label: 'Последний месяц' },
    { value: 'lastYear', label: 'Последний год' }
  ];

  const handleChange = (e) => {
    const sort = sortData.find((sort) => sort.value === e.target.value);
    setSortType(sort);
    if (sort.value != null) {
      getAllUsers(sort.value);
    }
  };

  return (
    <div className="appraise-status-container">
      <AuthorizedHeader title="Таблица статусов оценок" />
      <div className="appraise-status-body-container">
        <div className="appraise-status-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Oценивающий</TableCell>
                  <TableCell align="center">Oцениваемый</TableCell>
                  <TableCell align="center">Дата</TableCell>
                  <TableCell align="center">Cтатус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((row) => (
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
        <AlertHelper
          isOpen={openError}
          text={errorText}
          alertColor={alert}
          onClose={setError}
        />
      </div>
      <div className="appraise-status-table-sort">
        <p class="appraise-status-table-sort-text">Сортировать по:</p>
        <SelectHelper
          data={sortData}
          selectedData={sortType}
          onChange={handleChange}
          className="appraise-status-table-sort-select-helper"
        />
      </div>

      <div className="appraise-status-table-selector">
        <SelectHelper
          data={DUMMY_USERS}
          selectedData={rater}
          onChange={(e) => setRater(e.target)}
          className="appraise-status-select-helper"
        />
        <SelectHelper
          data={DUMMY_USERS}
          selectedData={ratedUser}
          onChange={(e) => setRatedUser(e.target)}
          className="appraise-status-select-helper"
        />
      </div>
    </div>
  );
};

export default UserAppraiseStatus;
