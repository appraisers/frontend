import { TextField } from '@material-ui/core';

import './InputHelper.css';

const InputHelper = ({ label, type, required,className, value, onChange, onBlur }) => {
  return (
    <TextField
      InputLabelProps={{
        shrink: true,
        className: 'label'
      }}
      label={label}
      type={type}
      required={required}
      className={className}
      variant="outlined"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default InputHelper;
