import backgroundImage from "../../assets/images/mainBackgroundImage.jpg";

import "./MainBackgroundImage.scss";

const MainBackgroundImage = ({ children }) => {
  return <div className="main-background-image">{children}</div>;
};

export default MainBackgroundImage;
