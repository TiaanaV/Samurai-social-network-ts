import React from "react";
import classes from "./MyPosts.module.css";
import { Field } from "redux-form";
import {
  required,
  maxLengthCreator,
} from "../../../utils/validators/validator";
import { Textarea } from "../../common/FormsControl/FormsControl";

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"newPostText"}
          className={classes.newPostArea}
          placeholder={"Post message..."}
          validate={[required, maxLength10]}
        />
        <div className={classes.buttonsArea}>
          <button className={classes.button}>Add posts</button>
          <button className={classes.button}>Remove</button>
        </div>
      </div>
    </form>
  );
};

export default AddPostForm;
