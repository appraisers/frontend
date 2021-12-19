/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { Backdrop, Modal } from "@material-ui/core";

import Account from "../PersonalData";
import AlertHelper from "../Alert/Alert";

import "./Burger.scss";

const BurgerMenu = (props) => {
  const [isModal, setIsModal] = useState(false);
  const [openError, setError] = useState(false);
  const [errorText, setErrorText] = useState(false);
  const [alert, setAlert] = useState("");

  return (
    <>
      {props.isAuth ? (
        <Menu {...props} disableAutoFocus>
          <a className="menu-item" href="/about">
            О проекте
          </a>
          <a className="menu-item" href="#">
            Результаты
          </a>
          <a className="menu-item" href="#">
            Кафедры
          </a>
          <a className="menu-item" href="#" onClick={() => setIsModal(true)}>
            Аккаунт
          </a>
          <a className="menu-item" href="#">
            Пройти тестирование
          </a>
        </Menu>
      ) : (
        <Menu {...props}>
          <a className="menu-item" href="/about">
            О нас
          </a>
          <a className="menu-item" href="/my">
            Личный кабинет
          </a>
          <a className="menu-item" href="#">
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
      <AlertHelper
        isOpen={openError}
        text={errorText}
        alertColor={alert}
        onClose={setError}
      />
    </>
  );
};

export default BurgerMenu;
