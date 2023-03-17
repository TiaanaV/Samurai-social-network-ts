import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DIalogsItem/DialogItem";
import Message from "./Message/Message";
import { reduxForm } from "redux-form";
import AddMessageForm from "./AddMessageForm";
import { InitialStateType } from "../../redux/dialogsReducer";

type PropsType = {
  dialogsPage:InitialStateType
  sendMessage: (messageText:string) => void
}

export type NewMessageFormValuesType = {
  newMessageBody:string
}


const Dialogs:React.FC<PropsType> = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem
      avatar={dialog.avatar}
      name={dialog.name}
      id={dialog.id}
      key={dialog.id}
    />
  ));
  let messagesElements = props.dialogsPage.messages.map((props) => (
    <Message
      message={props.message}
      writer={props.writer}
      avatar={props.avatar}
      key={props.id}
    />
  ));

  const addNewMessage = (values: NewMessageFormValuesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>{messagesElements}</div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;

export const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);
