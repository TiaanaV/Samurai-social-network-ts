import classes from "./ProfileInfo.module.css";
import React from "react";

export const Contacts = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contacts}>
      {contactTitle}:{contactValue}
    </div>
  );
};
