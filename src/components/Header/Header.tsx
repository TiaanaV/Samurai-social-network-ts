import React, { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

type PropsType = {
  isAuth:Boolean
  login:string
  logout:MouseEventHandler<HTMLButtonElement> /// авто исправление 
}

const Header = (props:PropsType) => {
  return (
    <header className={classes.header}>
      <img
        className={classes.logo}
        src="https://t4.ftcdn.net/jpg/02/45/71/47/360_F_245714788_JKe4Oa7UlZOr0kN3PDr0Q1SBUBmrSjCb.jpg"
      ></img>
      <div className={classes.titleBlock}>
        <h2 className={classes.title}>Samurai Network</h2>
      </div>
      <div>
        {props.isAuth ? (
          <div className={classes.loginBlock}>
            <button className={classes.buttonLogout} onClick={props.logout}>
              Log out
            </button>
            <p className={classes.userName}>{props.login}</p>
          </div>
        ) : (
          <NavLink className={classes.login} to={"/login"}>
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
