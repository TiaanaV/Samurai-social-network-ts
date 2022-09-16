import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user-icon.png";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  debugger;
  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img
          className={classes.avatar}
          src={
            props.profile.photos.large ? props.profile.photos.large : userPhoto
          }
        />
        <div>Name: {props.profile.fullName}</div>
        <div>About me: {props.profile.aboutMe}</div>
        <div>
          Looking for a job: {props.profile.lookingForAJob ? "Yes" : "No"}
        </div>
        <div>
          Description:
          {props.profile.lookingForAJob
            ? props.profile.lookingForAJobDescription
            : " "}
        </div>
        <ProfileStatus status={"Hello my friends"} />
      </div>
    </div>
  );
};

export default ProfileInfo;
