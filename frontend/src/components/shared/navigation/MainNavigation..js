import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
//import'./MainNavigation.css';

const MainNavigation = (props) => {
  const auth = useContext(AuthContext);
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top"
      id="mainNav"
    >
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Blogpost
        </NavLink>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i className="fa fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                data-toggle="collapse"
                data-target="#navbarResponsive"
                className="nav-link"
                to="/"
              >
                Home
              </NavLink>
            </li>
            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  className="nav-link"
                  to="/posts/new"
                >
                  Create Post
                </NavLink>
              </li>
            )}
            {!auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  className="nav-link"
                  to="/users/auth"
                >
                  Authentication
                </NavLink>
              </li>
            )}

            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  className="nav-link"
                  to={`/mypost/${auth.userId}`}
                >
                  My Posts
                </NavLink>
              </li>
            )}

            {auth.isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  data-toggle="collapse"
                  data-target="#navbarResponsive"
                  onClick={auth.logout}
                  className="nav-link"
                  to="/users/auth"
                >
                  Logout
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                data-toggle="collapse"
                data-target="#navbarResponsive"
                className="nav-link"
                to="/about"
              >
                About
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNavigation;
