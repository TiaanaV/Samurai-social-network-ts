import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DIalogsItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  debugger;
  let dialogsElements = props.dialogsPage.map((dialog) => (
    <DialogItem avatar={dialog.avatar} name={dialog.name} id={dialog.id} />
  ));
  let messagesElements = props.messages.map((props) => (
    <Message
      message={props.message}
      writer={props.writer}
      avatar={props.avatar}
    />
  ));
  let newMessageElement = React.createRef();
  let onSendMessageClick = () => {
    props.sendMessage();
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
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
            ref={newMessageElement}
            value={props.newMessageText}
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
