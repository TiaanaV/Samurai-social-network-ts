import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./DialogItem.module.css";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={classes.dialog}>
      <NavLink
        className={(element) =>
          element.isActive ? classes.active : classes.dialogLink
        }
        to={path}
      >
        {props.name}
      </NavLink>
    </div>
  );
};

export default DialogItem;
