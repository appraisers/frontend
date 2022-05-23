/* eslint-disable jsx-a11y/anchor-is-valid */
import { slide as Menu } from 'react-burger-menu';

import './Burger.scss';

const BurgerMenu = (props) => {
  return (
    <div>
      {props.isAuth ? (
        <Menu {...props} disableAutoFocus>
          <a
            className="menu-item"
            href="/"
            onClick={() => localStorage.removeItem('user')}
          >
            Главная страница
          </a>
          <a className="menu-item" href="/my">
            Личный кабинет
          </a>
        </Menu>
      ) : (
        <Menu {...props}>
          <a className="menu-item" href="/">
            Вход
          </a>
          <a className="menu-item" href="/forgot_password">
            Восстановить пароль
          </a>
        </Menu>
      )}
    </div>
  );
};

export default BurgerMenu;
