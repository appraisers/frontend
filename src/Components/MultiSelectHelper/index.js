import React from 'react';
import { MenuItem, ListItemText, Select, Checkbox } from '@material-ui/core';

import './MultiSelectHelper.scss';

const MenuProps = {
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      height: '30vh',
      width: '30%',
      marginTop: '5%',
      padding: '5px 0',
      transition: '0.001s'
    }
  }
};

const MultiSelectHelper = ({ data, setSelectedData, selectedData }) => {
  const onChange = (item) => {
    const elementIndex = selectedData.indexOf(
      (selectedItem) => item === selectedItem
    );
    if (elementIndex < 0) {
      setSelectedData(item);
    } else {
      setSelectedData((item) => item.splice(elementIndex, 1));
    }
  };

  return (
    <Select
      className="select-helper-dropdown"
      multiple
      value={selectedData}
      renderValue={(selected) => {
        return selected.map((item) => item.label)?.join(', ');
      }}
      MenuProps={MenuProps}
      disableUnderline
      onChange={(e) => onChange(e.target.value)}
    >
      {data.map((item) => (
        <MenuItem key={item.value} value={item}>
          <Checkbox
            checked={
              !!selectedData.find((selected) => item.value === selected.value)
            }
            color="default"
          />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </Select>
  );
};

export default MultiSelectHelper;
