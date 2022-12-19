import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <img
        className={classes.logo}
        src="https://t4.ftcdn.net/jpg/02/45/71/47/360_F_245714788_JKe4Oa7UlZOr0kN3PDr0Q1SBUBmrSjCb.jpg"
      ></img>
      <div className={classes.titleBlock}>
        <h2 className={classes.title}>Samurai Network</h2>
      </div>
      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login}{" "}
            <button className={classes.buttonLogin} onClick={props.logout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
