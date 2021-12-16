
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
