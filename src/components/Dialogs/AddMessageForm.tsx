import React from "react";
import classes from "./Dialogs.module.css";
import { Field, InjectedFormProps } from "redux-form";
import { createField, Textarea } from "../common/FormsControl/FormsControl";
import { maxLengthCreator, required } from "../../utils/validators/validator";
import LoginForm from "../Login/LoginForm";
import { NewMessageFormValuesType } from "./Dialogs";

type NewMessageValuesKeysType = Extract<keyof NewMessageFormValuesType,string>
type PropsType = {}

const AddMessageForm:React.FC<InjectedFormProps<NewMessageFormValuesType,PropsType> & PropsType>  = (props) => {
  const maxLength50 = maxLengthCreator(50);

  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.newMessageArea}>
        {createField <NewMessageValuesKeysType>
          ("Enter your message...",
          "newMessageBody",
          [required, maxLength50],
          Textarea)}
        {/* <Field
          className={classes.newMessage}
          typefield="textarea"
          component={Textarea}
          validate={[required, maxLength50]}
          name={"newMessageBody"}
          placeholder={"Enter your message..."}
        /> */}
        <button className={classes.buttonSend}>Send</button>
      </div>
    </form>
  );
};

export default AddMessageForm;
