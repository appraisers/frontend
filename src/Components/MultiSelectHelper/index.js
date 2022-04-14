import React from 'react';
import {
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  FormControl,
  InputLabel
} from '@material-ui/core';

import './MultiSelectHelper.scss';

const MenuProps = {
  getContentAnchorEl: null,
  PaperProps: {
    style: {
      height: 250,
      width: '30%',
      marginTop: '5%',
      padding: '5px 0',
      transition: '0.001s'
    }
  }
};

const MultiSelectHelper = ({
  data,
  setSelectedData,
  selectedData,
  onClose
}) => {
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
    <div className="select-helper-container">
      <h2 className="select-helper-header">
        Приглашение на прохождение опроса
      </h2>
      <span className="select-helper-modal-exit" onClick={onClose}>
        X
      </span>
      <FormControl className='select-helper-form'>
        <InputLabel>выбранный</InputLabel>
        <Select
          className="select-helper-dropdown"
          multiple
          value={selectedData}
          renderValue={(selected) => {
            let renderUser = [];
            selected.forEach((element) => {
              renderUser.push(element.label);
            });
            return renderUser.join(', ');
          }}
          MenuProps={MenuProps}
          disableUnderline
          onChange={(e) => onChange(e.target.value)}
        >
          {data.map((item) => (
            <MenuItem
              key={item.value}
              value={item}
              MenuProps={{
                getContentAnchorEl: null
              }}
              
            >
              <Checkbox
                checked={selectedData.indexOf(item) >= 0 ? true : false}
                color="default"
              />
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectHelper;