import React from "react";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControl/FormsControl";

const ProfileInfoDataForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>Save</button>
        <div>
          <b>Name:</b> {createField("Full name", "fullName", [], Input)}
        </div>
        <div>
          <b>About me: </b>
          {createField("Something about you ...", "aboutMe", [], Textarea)}
        </div>
        <div>
          <b>Looking for a job: </b>{" "}
          {createField(" ", "lookingForAJob", [], Input, { type: "checkbox" })}
        </div>
        <div>
          <b>My professional skills:</b>
          {createField("My professional skills", "mySkills", [], Textarea)}
        </div>

        {/* <div>
          <b>Contacts:</b>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <Contacts
                contactTitle={key}
                contactValue={props.profile.contacts[key]}
              />
            );
          })}
        </div> */}
      </div>
    </form>
  );
};

const ProfileReduxForm = reduxForm({ form: "profile-edit" })(
  ProfileInfoDataForm
);

export default ProfileReduxForm;
