import { connect } from "react-redux";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Fragment } from "react";

function _Header({ ...props }) {
  const matches = useMediaQuery("(min-width:800px)");

  // ,login
  const { user, logout } = props;
  const submit = () => {
    console.log("helooooooo");
  };
  return (
    <header className="main-header">
      <div>
        <Link className="decoration-none" style={{ color: "inherit" }} to={"/"}>
          <h1 className="main-header-logo">MisterToy</h1>
        </Link>
      </div>
      <div className="links-header-list">
        <nav className="header-list">
          {matches ? (
            <Fragment>
              {" "}
              <NavLink className="decoration-none" exact to="/">
                Home
              </NavLink>
              <NavLink className="decoration-none" to="/toy">
                Shop
              </NavLink>
              <NavLink className="decoration-none" to="/about">
                About
              </NavLink>
              <NavLink className="decoration-none" to="/dashboard">
                Dashboard
              </NavLink>
              {!user ? (
                <Fragment>
                  <NavLink className="decoration-none" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="decoration-none" to="/signup">
                    SignUP
                  </NavLink>
                </Fragment>
              ) : (
                <section className="user-info">
                  <h3>{user.fullname}</h3>
                  <NavLink
                    className="decoration-none"
                    to="/login"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </section>
              )}
            </Fragment>
          ) : (
            <MenuIcon onClick={submit} />
          )}
        </nav>
      </div>
    </header>
  );
}

function mapStateToProps(state) {
  return {
    // companyValue: state.appModule.val,
    // user: state.appModule.loggedinUser,
  };
}

export const Header = connect(mapStateToProps)(_Header);
