import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './SelectHelper.scss';

const SelectHelper = ({ data, onChange, selectedData }) => {
  return (
    <Select
      className="main-select-menu"
      value={selectedData}
      onChange={onChange}
      placeholder="Выберите оцениваемого"
    >
      {data?.map((item) => (
        <MenuItem
          className="main-select-menu-item"
          value={item.email}
          style={{ backgroundColor: '#cfb389', color: 'white ' }}
        >
          {item.fullname}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectHelper;
