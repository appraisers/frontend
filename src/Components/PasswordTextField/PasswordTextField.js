import React, { useState } from 'react';
import {
  IconButton,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl
} from '@material-ui/core'
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import './PasswordTextField.scss'

const InputAdornments = ({
  checkPassword, 
  repeatPasswordError, 
  passwordError, 
  value, 
  setValue, 
  label="Пароль"
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <FormControl variant="outlined" className={passwordError || repeatPasswordError ? 'input-password-error' : 'input'}>
      <InputLabel 
        shrink 
        variant="outlined" 
        style={{backgroundColor: 'white', padding: "0 3px", color: 'black'}}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(e) => handleChange(e)}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className="icon-eye"
            >
              {showPassword ? <Visibility/> : <VisibilityOff/>}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export default InputAdornments;