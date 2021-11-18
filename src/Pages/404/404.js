import { NavLink } from "react-router-dom";
import Lottie from 'lottie-react-web'

import NotFoundAnimation from '../../assets/lottie/404.json';

import Header from "../../Components/Header/Header";
import './404.css';

const NotFoundPage = () => {
    return (
        <>
            {<Header/>}
            <div className='wrapper-main-not-found'>
                <div className='wrapper-lottie'>
                    <Lottie
                        options={{
                            animationData: NotFoundAnimation
                        }}
                    />
                </div>

                <span className='title-not-found'>
                    Что-то пошло не так
                </span>

                <p className='summary-not-found'>
                    Кажется, что страница которую вы ищите, была перемещена,
                    переименована или даже удалена!
                </p>

                <NavLink to='/'>
                    <button className="button-back"><span>Вернуться</span></button>
                </NavLink>
            </div>
        </>
    );
}

export default NotFoundPage;