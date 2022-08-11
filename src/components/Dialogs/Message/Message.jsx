import React from "react";
import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <div className={classes.message}>
      <img className={classes.avatar} src={props.avatar} />
      {props.message}
    </div>
  );
};

export default Message;
