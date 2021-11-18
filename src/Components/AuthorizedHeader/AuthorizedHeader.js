import { useState } from "react";
import { NavLink } from "react-router-dom";
import appLogo from '../../assets/branding/logo.png';
import { Backdrop, Modal } from '@material-ui/core';
import useWindowDimensions from '../windowSizeHook/windowSize.js';
import BurgerMenu from '../BurgerMenu/Burger.js';
import Account from '../PersonalData/PersonalData';
import AlertHelper from '../Alert/Alert';
import './AuthorizedHeader.css';

const AuthorizedHeader = () => {
    const { width } = useWindowDimensions();
    const [isModal , setIsModal] = useState(false);
    const [openError, setError] = useState(false);
    const [errorText, setErrorText] = useState(false);
    const [alert, setAlert] = useState("");
    
    return (    
        <div className="main-header-authorized-header">
            {width > 1000 
            ? <>
                <NavLink to='/' >
                    <img
                        className="our-icon"
                        src={appLogo}
                        alt="logo"/>
                </NavLink>

                <ul className="nav-authorized-header">
                    <li className='nav-button-authorized-header'>
                        <NavLink to='/about' activeClassName='active-header'>О проекте</NavLink>
                    </li>

                    <li className='nav-button-authorized-header'>
                        <NavLink to='/my/results' activeClassName='active-header'>Результаты</NavLink>
                    </li>

                    <li className='nav-button-authorized-header'>
                        <NavLink to='/departments' activeClassName='active-header'>Кафедры</NavLink>
                    </li>

                    <li className='nav-button-authorized-header'>
                        <NavLink to='#'>
                            <span onClick={() => setIsModal(true)}>
                                Аккаунт
                            </span>
                        </NavLink>
                    </li>

                    <li className='round-button-authorized-header'>
                        <NavLink to='/my/test'>Пройти тестирование</NavLink>
                    </li>
                </ul>
            </>
            : <BurgerMenu pageWrapId={"page-wrap"} isAuth />
        }
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
        </div>
    );
}


export default AuthorizedHeader;