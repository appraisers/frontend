import { NavLink } from 'react-router-dom';

import BurgerMenu from '../BurgerMenu';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import logoLeft from '../../assets/images/logo-left.svg';
import logoRight from '../../assets/images/logo-right.svg';

import './AuthorizedHeader.scss';

const MOBILE_SCREEN_WIDTH = 700;

const AuthorizedHeader = ({ title }) => {
  const { width } = useWindowDimensions();

  return (
    <div className="survey-header">
      {width > MOBILE_SCREEN_WIDTH ? (
        <>
          <span className="survey-logo">
            <img src={logoLeft} className="survey-logo-left" alt="logo" />
          </span>
          {title && <span className="question-number">{title}</span>}
          <span className="survey-logo">
            <NavLink to="/">
              <img
                src={logoRight}
                className="survey-logo-right"
                alt="logo"
                onClick={() => localStorage.removeItem('user')}
              />
            </NavLink>
          </span>
        </>
      ) : (
        <BurgerMenu pageWrapId="page-wrap" isAuth />
      )}
    </div>
  );
};

export default AuthorizedHeader;
