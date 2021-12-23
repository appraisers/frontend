import { NavLink } from 'react-router-dom';

import appLogo from '../../assets/branding/logo.png';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/index.js';

import './MainHeader.scss';

const Header = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="main-header-page">
      {width > 1010 ? (
        <>
          <NavLink to="/">
            <img className="main-header-icon" src={appLogo} alt="logo" />
          </NavLink>

          <div className="main-header-container">
            <ul className="nav-main-header-ul">
              <NavLink to="#" activeClassName="active-header">
                <li className="nav-button-main-header">О нас</li>
              </NavLink>

              <NavLink to="#" activeClassName="active-header">
                <li className="nav-button-main-header">Личный кабинет</li>
              </NavLink>

              <NavLink to="#" activeClassName="active-header">
                <li className="nav-button-main-header">Регистрация</li>
              </NavLink>
            </ul>
          </div>
        </>
      ) : (
        <BurgerMenu pageWrapId="page-wrap" />
      )}
    </div>
  );
};

export default Header;
