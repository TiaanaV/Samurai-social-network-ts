import React from "react";
import { PhotosType, ProfileType } from "../../types common/types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  isOwner:boolean
  profile:ProfileType
  status:string
 
  savePhoto: (photos:PhotosType) => void
  saveProfile: (profile:ProfileType) => Promise<void>
  updateStatus: (status:string) => void
}

const Profile:React.FC<PropsType> = (props) => {
  return (
    <div>
      <ProfileInfo
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
