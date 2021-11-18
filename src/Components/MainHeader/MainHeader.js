import { NavLink } from "react-router-dom";
import appLogo from '../../assets/branding/logo.png';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/Burger.js';
import './MainHeader.css';

const Header = () => {
    const { width } = useWindowDimensions();
    
    return (    
        <div className="mainPage-header">
            {width > 1010 
            ? <>
                <NavLink to='/' >
                    <img
                        className="ourMain-icon"
                        src={appLogo}
                        alt="logo"/>
                </NavLink>

                
                <div className="main-header-background">
                    <ul className="nav-main-header">
                        <li className='nav-button-main-header'>
                            <NavLink to='/about' activeClassName='active-header'>О проекте</NavLink>
                        </li>

                        <li className='nav-button-main-header'>
                            <NavLink to='/departments' activeClassName='active-header'>Кафедры</NavLink>
                        </li>

                        <li className='nav-button-main-header'>
                            <NavLink to='/login' activeClassName='active-header'>Вход</NavLink>
                        </li>

                        <li className='round-button-main-header'>
                            <NavLink to='/sign/up' activeClassName='active-header'>Регистрация</NavLink>
                        </li>
                    </ul>
                </div>
                
            </>
            : <BurgerMenu pageWrapId={"page-wrap"} />
        }
        </div>
    );
}


export default Header;