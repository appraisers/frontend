
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

          {/* <NavLink to="/my/test">
            <button className="button">
              <span>Пройти тестирование</span>
            </button>
          </NavLink> */}
        </div>
        
{/* Левая часть */}
        {/* <div className="wrapper-right">

          

            <div className="lottie-shadow">
            <Lottie
              options={{
                animationData: HomePagePicture,
              }}
            />
          </div>  

          
        </div>  */}
      </div>
    </>
  );
};

export default HomePage;
