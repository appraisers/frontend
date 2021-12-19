import { TextField } from '@material-ui/core';

import './InputHelper.css';

const InputHelper = ({
  label,
  type,
  required,
  value,
  onChange,
  onBlur
}) => {

  return (
    <TextField
      InputLabelProps={{
        shrink: true,
        className: 'label'
      }}
      label={label}
      type={type}
      required={required}
      className="input-helper"
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default InputHelper;
