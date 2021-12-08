import { NavLink } from "react-router-dom";

import Header from "../../Components/Header/Header";

import "./404.css";

import React from "react";



const NotFoundPage = () => {

    
  return (
    <>
      <Header />
      <div className="wrapper-main-not-found">
        <div className="wrapper-lottie">
          <img src="/images/image-404.gif" className="image-404" alt=""/>
        </div>

        <span className="title-not-found">Page not found</span>

        <p className="summary-not-found">
          Seems you have lost your way. Let's take you back to the
          <NavLink to="/">
            <a className="link-back"> main page</a>
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default NotFoundPage;
