import React from "react";
import classes from "./ProfileInfo.module.css";
import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControl/FormsControl";
import style from "./../../common/FormsControl/FormsControls.module.css";

const ProfileInfoDataForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <button>Save</button>
        {props.error && (
          <div className={style.formSummaryError}>{props.error}</div>
        )}
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
          {createField(
            "My professional skills",
            "lookingForAJobDescription",
            [],
            Textarea
          )}
        </div>

        <div>
          <b>Contacts:</b>
          {Object.keys(props.profile.contacts).map((key) => {
            return (
              <div key={key} className={classes.contacts}>
                <b>{key}:</b>
                {createField(key, "contacts." + key, [], Input)}
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

const ProfileReduxForm = reduxForm({
  form: "profile-edit",
  enableReinitialize: true,
  destroyOnUnmount: false,
  keepDirtyOnReinitialize: true,
})(ProfileInfoDataForm);

export default ProfileReduxForm;
