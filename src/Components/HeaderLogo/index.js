import { NavLink } from 'react-router-dom';

import appLogo from '../../assets/branding/logo.png';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/index.js';
import './HeaderLogo.scss';


const MOBILE_SCREEN_WIDTH = 700;

const HeaderLogotype = () => {
  const { width } = useWindowDimensions();

  return (
    <div className="main-header-page">
      {width > MOBILE_SCREEN_WIDTH ? (
        <>
          <NavLink to="/">
            <img className="main-header-icon" src={appLogo} alt="logo" />
          </NavLink>
        </>
      ) : (
        <BurgerMenu pageWrapId="page-wrap" />// как удалить эту строчку?
      )
      }
    </div>
  );
};
export default HeaderLogotype;