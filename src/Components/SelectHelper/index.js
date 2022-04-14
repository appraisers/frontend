import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './SelectHelper.scss';

const DEFAULT_PLACEHOLDER_VALUE = 'placeholder'

const SelectHelper = ({
  data,
  onChange,
  selectedData,
  placeholder
}) => {
  const selectedValue = selectedData ? selectedData.value : DEFAULT_PLACEHOLDER_VALUE
  
  return (
    <Select
      className="main-select-menu"
      defaultValue={DEFAULT_PLACEHOLDER_VALUE}
      value={selectedValue}
      onChange={onChange}
      disableUnderline
    >
      <MenuItem className="main-select-menu-placeholder" disabled value={DEFAULT_PLACEHOLDER_VALUE}>
        {placeholder}
      </MenuItem>
      {data?.map((item) => (
        <MenuItem
          key={item.value}
          className="main-select-menu-item"
          value={item.value}
          style={{ backgroundColor: '#cfb389', color: 'white' }}
        >
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectHelper;