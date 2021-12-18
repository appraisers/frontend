import { NavLink } from "react-router-dom";

import appLogo from "../../assets/branding/logo.png";
import useWindowDimensions from "../windowSizeHook/windowSize.js";
import BurgerMenu from "../BurgerMenu/index.js";

import "./MainHeader.scss";

const Header = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="mainPage-header">
      {width > 1010 ? (
        <>
          <NavLink to="/">
            <img className="ourMain-icon" src={appLogo} alt="logo" />
          </NavLink>

          <div className="main-header-background">
            <ul className="nav-main-header">
              <li className="nav-button-main-header">
                <NavLink to="#" activeClassName="active-header">
                  О нас
                </NavLink>
              </li>

              <li className="nav-button-main-header">
                <NavLink to="#" activeClassName="active-header">
                  Личный кабинет
                </NavLink>
              </li>

              <li className="nav-button-main-header">
                <NavLink to="#" activeClassName="active-header">
                  Регистрация
                </NavLink>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <BurgerMenu pageWrapId={"page-wrap"} />
      )}
    </div>
  );
};

export default Header;
