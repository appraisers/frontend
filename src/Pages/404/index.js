import React from "react";
import { NavLink } from "react-router-dom";

import errorImage from "../../assets/images/404.gif";

import "./404.scss";

const NotFoundPage = () => {
  return (
    <div>
      <div className="main-container-not-found">
        <div className="gif-wrapper">
          <img
            src={errorImage}
            className="image-404"
            alt="page not found gif"
          />
        </div>

        <span className="title-not-found">Page not found</span>

        <p className="summary-not-found">
          Seems you have lost your way. Let's take you back to the
          <NavLink to="/">
            <span className="link-back"> main page</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
