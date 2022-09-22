import React from "react";
import classes from "./Dialogs.module.css";
import { Field } from "redux-form";

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.newMessageArea}>
        <Field
          className={classes.newMessage}
          type={"textarea"}
          component={"input"}
          name={"newMessageBody"}
          placeholder={"Enter your message..."}
        />
        <button className={classes.buttonSend}>Send</button>
      </div>
    </form>
  );
};

export default AddMessageForm;
