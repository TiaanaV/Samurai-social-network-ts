import React from "react";
import classes from "./Dialogs.module.css";
import { Field } from "redux-form";
import { Forms } from "../common/FormsControl/FormsControl";
import { maxLengthCreator, required } from "../../utils/validators/validator";

const AddMessageForm = (props) => {
  const maxLength50 = maxLengthCreator(50);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.newMessageArea}>
        <Field
          className={classes.newMessage}
          typeField="textarea"
          component={Forms}
          validate={[required, maxLength50]}
          name={"newMessageBody"}
          placeholder={"Enter your message..."}
        />
        <button className={classes.buttonSend}>Send</button>
      </div>
    </form>
  );
};

export default AddMessageForm;
