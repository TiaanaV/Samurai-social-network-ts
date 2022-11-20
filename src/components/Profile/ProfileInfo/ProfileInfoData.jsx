import React from "react";
import classes from "./ProfileInfo.module.css";
import { Contacts } from "./Contacts";

const ProfileInfoData = (props) => {
  return (
    <div className={classes.profileInfo}>
      {props.isOwner && (
        <div>
          <button onClick={props.goToEditMode}>Edit</button>
        </div>
      )}
      <div>
        <b>Name:</b> {props.profile.fullName}
      </div>
      <div>
        <b>About me: </b>
        {props.profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job: </b>
        {props.profile.lookingForAJob ? "Yes" : "No"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professional skills:</b>
          {props.profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contacts
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfileInfoData;
