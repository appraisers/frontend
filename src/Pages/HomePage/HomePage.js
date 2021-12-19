<<<<<<< HEAD:src/Pages/HomePage/HomePage.js
import { NavLink } from "react-router-dom";
import Lottie from "lottie-react-web";

import Header from "../../Components/MainHeader";
import HomePagePicture from "../../assets/lottie/welcome.json";

import "./HomePage.scss";

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="wrapper-main">
        <div className="wrapper-left">
          <span className="greeting-main">Добро пожаловать!</span>

          <p className="description-main">
            Перед прохождением тестирования необходимо авторизоваться в системе.
            После авторизации вы сразу сможете приступить к тестирвоанию
          </p>

          <NavLink to="/my/test">
            <button className="button">
              <span>Пройти тестирование</span>
            </button>
          </NavLink>
        </div>

        <div className="wrapper-right">
          <div className="lottie-shadow">
            <Lottie
              options={{
                animationData: HomePagePicture,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
=======
import Header from "../../Components/MainHeader";
import BackgroundImage from "../../Components/BackgroundImage";

import "./HomePage.scss";

const HomePage = () => {
  return (

    <>
      <Header />

      <BackgroundImage />

      <div className="wrapper-main">
        <div className="wrapper-left">
          <span className="greeting-main">Собирайте обратную связь в формате опроса по методу «360 градусов»</span>
          <p className="description-main">
             Профессиональные качества сотрудника оценивают все, с кем он работает: от подчиненных до руководителей
          </p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
>>>>>>> de70b33aac734e91ef425bd35f1df99f31e0d751:src/Pages/HomePage/index.js
