import { NavLink } from "react-router-dom";
import appLogo from '../../assets/branding/logo.png';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/Burger.js';
import './Header.css';

const Header = () => {
    const { width } = useWindowDimensions();
    
    return (    
        <div className="main-header">
            {width > 800 
            ? <>
                <NavLink to='/' >
                    <img
                        className="our-icon"
                        src={appLogo}
                        alt="logo"/>
                </NavLink>

                
                
                <ul className="nav">
                    <li className='nav-button'>
                        <NavLink to='/about' activeClassName='active-header'>О проекте</NavLink>
                    </li>

                    <li className='nav-button'>
                        <NavLink to='/departments' activeClassName='active-header'>Кафедры</NavLink>
                    </li>

                    <li className='nav-button'>
                        <NavLink to='/login' activeClassName='active-header'>Вход</NavLink>
                    </li>

                    <li className='round-button'>
                        <NavLink to='/sign/up' activeClassName='active-header'>Регистрация</NavLink>
                    </li>
                </ul>
            </>
            : <BurgerMenu pageWrapId={"page-wrap"} />
        }
        </div>
    );
}


export default Header;