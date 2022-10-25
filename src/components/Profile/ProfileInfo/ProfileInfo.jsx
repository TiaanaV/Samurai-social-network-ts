import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user-icon.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  const onAvatarPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img
          className={classes.avatar}
          src={props.profile.photos.large || userPhoto}
        />
        {props.isOwner && (
          <form>
            <input type={"file"} onChange={onAvatarPhotoSelected} />
          </form>
        )}
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
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
