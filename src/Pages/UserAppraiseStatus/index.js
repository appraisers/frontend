import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

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
  const [appraises, setAppraises] = useState([]);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState('');
  const [user, setUser] = useState(null);
  const [userDataSelect, setUserDataSelect] = useState([]);
  const [author, setAuthor] = useState(null);
  const [authorDataSelect, setAuthorDataSelect] = useState([]);
  const [limit] = useState(50);
  const [offset] = useState(0);
  const [sortType, setSortType] = useState({
    value: 'lastMonth',
    label: 'Последний месяц'
  });

  const getAllAppraises = async (filter, selectedUser, selectedAuthor) => {
    let preparedFilter = filter == null ? '' : `&${filter}=desc`;
    if (selectedUser != null) {
      preparedFilter += `&userId=${selectedUser}`;
    }
    if (selectedAuthor != null) {
      preparedFilter += `&authorId=${selectedAuthor}`;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/appraise/get-appraises?limit=${limit}&offset=${offset}${preparedFilter}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200) {
        setAppraises(res.data.appraises);
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  const getUsersForSelect = async (selectedUser, selectedAuthor) => {
    let filter = '';
    if (selectedUser != null) {
      filter = `&userId=${selectedUser.value}`;
    }
    if (selectedAuthor != null) {
      filter = `&authorId=${selectedAuthor.value}`;
    }

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_ENDPOINT}/appraise/get-appraises-users?limit=${limit}&offset=${offset}${filter}`,
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );
      if (res.data?.statusCode === 200 && res.data.users != null) {
        const usersForSelect = res.data.users.map((user) => ({
          value: user.id,
          label: user.fullname
        }));
        const authorsForSelect = res.data.authors.map((user) => ({
          value: user.id,
          label: user.fullname
        }));
        // if nothing selected - set two state
        // if selected user - set authors for select
        // if selected author - set users for select
        if (selectedUser == null && selectedAuthor == null) {
          setAuthorDataSelect(authorsForSelect);
          setUserDataSelect(usersForSelect);
        } else if (selectedUser != null && selectedAuthor == null) {
          setAuthorDataSelect(authorsForSelect);
        } else if (selectedUser == null && selectedAuthor != null) {
          setUserDataSelect(usersForSelect);
        }
      }
    } catch (e) {
      setAlert('warning');
      setErrorText('Внутренняя ошибка сервера');
      setError(true);
    }
  };

  useEffect(() => {
    getAllAppraises(sortType.value, user?.value ?? null, author?.value ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  useEffect(() => {
    if ((user == null) | (author == null)) {
      getUsersForSelect(user, author);
    }
    getAllAppraises(sortType.value, user?.value ?? null, author?.value ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, author]);

  const sortData = [
    { value: 'lastMonth', label: 'Последний месяц' },
    { value: 'lastYear', label: 'Последний год' }
  ];

  const handleChange = (e) => {
    const sort = sortData.find((sort) => sort.value === e.target.value);
    setSortType(sort);
  };

  return (
    <div className="appraise-status-container">
      <AuthorizedHeader title="Таблица статусов оценок" />
      <div className="appraise-status-page-header">
        <div className="appraise-status-table-selector">
          <SelectHelper
            data={userDataSelect}
            selectedData={user}
            placeholder="Выберите оцениваемого"
            onChange={(e) => setUser(e.target)}
            className="appraise-status-select-helper"
          />

          <SelectHelper
            data={authorDataSelect}
            selectedData={author}
            placeholder="Выберите оценивающего"
            onChange={(e) => setAuthor(e.target)}
            className="appraise-status-select-helper"
          />
        </div>

        <div className="appraise-status-table-sort">
          <p className="appraise-status-table-sort-text">Сортировать по:</p>
          <SelectHelper
            data={sortData}
            selectedData={sortType}
            onChange={handleChange}
            className="appraise-status-table-sort-select-helper"
          />
        </div>
      </div>

      <div className="appraise-status-body-container">
        <div className="appraise-status-table">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Oцениваемый</TableCell>
                  <TableCell align="center">Oценивающий</TableCell>
                  <TableCell align="center">Дата</TableCell>
                  <TableCell align="center">Cтатус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appraises &&
                  appraises.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell align="center">
                        {row.user?.fullname ?? '-'}
                      </TableCell>
                      <TableCell align="center">
                        {row.author?.fullname ?? '-'}
                      </TableCell>
                      <TableCell align="center">
                        {format(new Date(row.createdAt), 'dd-MM-yyyy HH:MM') ??
                          '-'}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: row.status ? '#32a834' : '#f50717',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}
                      >
                        {row.status ? 'оценено' : 'не оценено'}
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
    </div>
  );
};

export default UserAppraiseStatus;
