/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { slide as Menu } from "react-burger-menu";
import Account from '../PersonalData/PersonalData';
import { Backdrop, Modal } from '@material-ui/core';
import "./Burger.css";
import AlertHelper from '../Alert/Alert';

const BurgerMenu = (props) => {
  const [isModal , setIsModal] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState("");

  return (
    <>
      {props.isAuth ? (
        <Menu {...props} disableAutoFocus >
          <a className="menu-item" href="/about">
            О проекте
          </a>
          <a className="menu-item" href="/my/results">
            Результаты
          </a>
          <a className="menu-item" href="/departments">
            Кафедры
          </a>
          <a className="menu-item" href="#" onClick={() => setIsModal(true)}>
            Аккаунт
          </a>
          <a className="menu-item" href="/my/test">
            Пройти тестирование
          </a>
        </Menu>
      ) : (
        <Menu {...props}>
          <a className="menu-item" href="/about">
            О проекте
          </a>
          <a className="menu-item" href="/departments">
            Кафедры
          </a>
          <a className="menu-item" href="/login">
            Вход
          </a>
          <a className="menu-item" href="/sign/up">
            Регистрация
          </a>
        </Menu>
      )}
      <Modal
        open={isModal}
        className="modal-window"
        onClose={() => setIsModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
            timeout: 1000,
        }}
        >
          <Account 
            active={isModal} 
            setActive={setIsModal} 
            setError={setError} 
            setErrorText={setErrorText} 
            setAlert={setAlert} 
          />
        </Modal>
        <AlertHelper isOpen={openError} text={errorText} alertColor={alert} onClose={setError} />
    </>
  );
};

export default BurgerMenu;
