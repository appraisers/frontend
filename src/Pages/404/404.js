import React from "react";
import { NavLink } from "react-router-dom";
import "./404.css";

const NotFoundPage = () => {
  return (
    <>
      <div className="main-container-not-found">
        <div className="gif-wrapper">
          <img
            src="/images/image-404.gif"
            className="image-404"
            alt="page not found gif"
          />
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
