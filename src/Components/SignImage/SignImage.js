import React from "react";
import centerImage from "../../assets/illustrations/centerImage.svg"
import "./SignImage.scss";

const ImageForLogin = () => {
  return (
    <div className='main-square'>
      <div className='square-3' />
      <div className='square-2' />
      <div className='square-1' />
      <div className='square-4' />
      <div className='square-5' />
      <div className='square-6' />
      <div className='square-7' />
      <div className='square-8' />
      <img
        className="center-image"
        src={centerImage}
        alt="center"/>
    </div>
  );
};

export default ImageForLogin;
