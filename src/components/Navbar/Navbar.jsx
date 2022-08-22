import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  let friendsAvaElement = props.popularFriend.map((p) => (
    <img className={classes.navbarFriendAva} src={p.avatar} />
  ));
  let friendsNameElement = props.popularFriend.map((p) => (
    <span className={classes.friendsNames}>{p.name}</span>
  ));

  return (
    <nav className={classes.nav}>
      {props.links.map(({ path, nameOfPage }) => (
        <div className={classes.item} key={nameOfPage}>
          <NavLink
            to={path}
            className={(navData) =>
              navData.isActive ? classes.active : classes.item
            }
          >
            {nameOfPage}
          </NavLink>
        </div>
      ))}
      <div className={classes.popularFriendsSection}>
        <NavLink
          to="/friends"
          className={(navData) =>
            navData.isActive ? classes.active : classes.popularFriendsSection
          }
        >
          Friends
        </NavLink>
        <div className={classes.navbarFriends}>
          {friendsAvaElement}
          {friendsNameElement}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
