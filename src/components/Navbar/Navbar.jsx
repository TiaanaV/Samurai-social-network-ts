import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = (props) => {
  const links = [
    { path: "/profile", nameOfPage: "Profile" },
    { path: "/dialogs", nameOfPage: "Messages" },
    { path: "/news", nameOfPage: "News" },
    { path: "/music", nameOfPage: "Music" },
    { path: "/settings", nameOfPage: "Settings" },
  ];
  let friendsAvaElement = props.avatar.map((p) => (
    <img className={classes.navbarFriendAva} src={p.avatar} />
  ));
  let friendsNameElement = props.name.map((p) => (
    <span className={classes.friendsNames}>{p.name}</span>
  ));

  return (
    <nav className={classes.nav}>
      {links.map(({ path, nameOfPage }) => (
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
