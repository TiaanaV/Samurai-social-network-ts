import React from "react";
import classes from "./MyPosts.module.css";
import { Field } from "redux-form";

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          type={"text"}
          component="textarea"
          name={"newPostText"}
          className={classes.newPostArea}
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
