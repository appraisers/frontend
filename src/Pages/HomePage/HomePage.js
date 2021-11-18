import { NavLink } from 'react-router-dom';

import Lottie from 'lottie-react-web'

import HomePagePicture from '../../assets/lottie/welcome.json';

import Header from "../../Components/MainHeader/MainHeader";
import './HomePage.css';

const HomePage = () => {
    return (
        <>
            <Header />
            <div className='wrapper-main'>
                <div className='wrapper-left'>
                    <span className='greeting-main'>
                        Добро пожаловать!
                    </span>

                    <p className='description-main'>
                        Перед прохождением тестирования необходимо авторизоваться в системе. После авторизации вы сразу сможете приступить к тестирвоанию
                    </p>

                    <NavLink to='/my/test'>
                        <button className="button"><span>Пройти тестирование</span></button>
                    </NavLink>
                </div>

                <div className='wrapper-right'>
                    <div className='lottie-shadow'>
                        <Lottie
                            options={{
                                animationData: HomePagePicture
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}


export default HomePage;
