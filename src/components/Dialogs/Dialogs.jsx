import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DIalogsItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
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

  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onMessageChange = (e) => {
    let text = e.target.value;
    props.onMessageChange(text);
  };

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        {messagesElements}
        <div className={classes.newMessageArea}>
          <textarea
            onChange={onMessageChange}
            className={classes.newMessage}
            value={props.dialogsPage.newMessageText}
          ></textarea>
          <button className={classes.buttonSend} onClick={onSendMessageClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
