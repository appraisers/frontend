import backgroundImage from '../../assets/images/mainBackgroundImage.jpg';

import "./MainBackgroundImage.scss";

const MainBackgroundImage = () => {
  return (
    <img src={backgroundImage} className="main-background-image" alt="page not found gif" />
  );
};

export default MainBackgroundImage;
