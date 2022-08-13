import React from "react";
import classes from "./Dialogs.module.css";
import DialogItem from "./DIalogsItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((dialog) => (
    <DialogItem avatar={dialog.avatar} name={dialog.name} id={dialog.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((props) => (
    <Message
      message={props.message}
      writer={props.writer}
      avatar={props.avatar}
    />
  ));
  let newMessageElement = React.createRef();
  let addMessageClick = () => {
    props.addMessage();
  };

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
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
            value={props.dialogsPage.newMessageText}
          ></textarea>
          <button className={classes.buttonSend} onClick={addMessageClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
