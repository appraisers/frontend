import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './SelectHelper.scss';

const SelectHelper = ({ data, onChange, selectedData, placeholder }) => {
  return (
    <Select
      className="main-select-menu"
      defaultValue={placeholder}
      value={selectedData == null ? placeholder : selectedData}
      onChange={onChange}
      renderValue={() =>
        selectedData == null ? placeholder : selectedData.label
      }
      disableUnderline
    >
      {data?.map((item) => (
        <MenuItem
          key={item.value}
          className="main-select-menu-item"
          value={item.value}
          style={{ backgroundColor: '#cfb389', color: 'white ' }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectHelper;
