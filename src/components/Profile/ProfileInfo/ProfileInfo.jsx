import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img
          className={classes.wallPicture}
          src="https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YWxvbmV8ZW58MHx8MHx8&w=1000&q=80"
        />
      </div>
      <div className={classes.descriptionBlock}>
        <img className={classes.avatar} src={props.profile.photos.large} />
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
      </div>
    </div>
  );
};

export default ProfileInfo;
