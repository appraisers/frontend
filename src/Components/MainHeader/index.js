import { NavLink } from 'react-router-dom';

import appLogo from '../../assets/branding/logo.png';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/index.js';

import './MainHeader.scss';

const MOBILE_SCREEN_WIDTH = 700;

const Header = ({ withButton }) => {
  const { width } = useWindowDimensions();

  return (
    <div className="main-header-page">
      {width > MOBILE_SCREEN_WIDTH ? (
        <>
          <NavLink to="/">
            <img className="main-header-icon" src={appLogo} alt="logo" />
          </NavLink>

          {withButton && (
            <div className="main-header-container">
              <ul className="nav-main-header-ul">
                <NavLink to="#" activeClassName="active-header">
                  <li className="nav-button-main-header">О нас</li>
                </NavLink>

                <NavLink to="#" activeClassName="active-header">
                  <li className="nav-button-main-header">Личный кабинет</li>
                </NavLink>
              </ul>
            </div>
          )}
        </>
      ) : (
        <BurgerMenu pageWrapId="page-wrap" />
      )}
    </div>
  );
};

export default Header;
