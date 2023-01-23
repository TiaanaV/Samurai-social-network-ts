import classes from "./ProfileInfo.module.css";
import React from "react";

type PropsType = {
  contactTitle:string
  contactValue:string
  
}

export const Contacts:React.FC<PropsType> = ({ contactTitle, contactValue }) => {
  return (
    <div className={classes.contacts}>
      {contactTitle}:{contactValue}
    </div>
  );
};
