import React from "react";

const ProfileInfoDataForm = (props) => {
  return (
    <form>
      <div>
        <button onClick={props.goToEditMode}>Save</button>
        <div>
          <b>Name:</b> {props.profile.fullName}
        </div>
      </div>
    </form>
    // <div className={classes.profileInfo}>
    //   <div>
    //     <b>Name:</b> {props.profile.fullName}
    //   </div>
    //   <div>
    //     <b>About me: </b>
    //     {props.profile.aboutMe}
    //   </div>
    //   <div>
    //     <b>Looking for a job: </b>
    //     {props.profile.lookingForAJob ? "Yes" : "No"}
    //   </div>
    //   {props.profile.lookingForAJob && (
    //     <div>
    //       <b>My professional skills:</b>
    //       {props.profile.lookingForAJobDescription}
    //     </div>
    //   )}
    //   <div>
    //     <b>Contacts:</b>
    //     {Object.keys(props.profile.contacts).map((key) => {
    //       return (
    //         <Contacts
    //           contactTitle={key}
    //           contactValue={props.profile.contacts[key]}
    //         />
    //       );
    //     })}
    //   </div>
    // </div>
  );
};

export default ProfileInfoDataForm;
