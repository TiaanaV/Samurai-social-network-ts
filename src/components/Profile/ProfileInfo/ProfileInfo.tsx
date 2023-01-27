import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader";
import classes from "./ProfileInfo.module.css";
import userPhoto from "../../../assets/images/user-icon.png";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileInfoData from "./ProfileInfoData";
import ProfileInfoDataForm from "./ProfileInfoDataForm";
import { PhotosType, ProfileType } from "../../../types common/types";

type PropsType = {
  profile:ProfileType
  savePhoto: (photos:PhotosType) => void
  saveProfile: (profile:ProfileType) => Promise<void>

}

const ProfileInfo:React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const onAvatarPhotoSelected = (e:) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formDate:ProfileType) => {
    props.saveProfile(formDate).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img
          className={classes.avatar}
          src={props.profile.photos.large || userPhoto}
        />
        {props.isOwner && (
          <form className={classes.selectPhotoBlock}>
            <input type={"file"} onChange={onAvatarPhotoSelected} />
          </form>
        )}
        {editMode ? (
          <ProfileInfoDataForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileInfoData
            goToEditMode={() => {
              setEditMode(true);
            }}
            profile={props.profile}
            isOwner={props.isOwner}
          />
        )}

        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
