import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field } from "redux-form";
import { reduxForm } from "redux-form";

const MyPosts = (props) => {
  let postsElement = props.posts.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} />
  ));

  let newPostElement = React.createRef();
  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.headline}>My posts</h3>
      <div>
        <Field
          type={"text"}
          component={"input"}
          name={"post"}
          onChange={onPostChange}
          ref={newPostElement}
          className={classes.newPostArea}
          value={props.newPostText}
        />

        <div className={classes.buttonsArea}>
          <button className={classes.button} onClick={onAddPost}>
            Add posts
          </button>
          <button className={classes.button}>Remove</button>
        </div>
      </div>
      <div className={classes.posts}>{postsElement}</div>
    </div>
  );
};

export default MyPosts;

export const MyPostsReduxForm = reduxForm({ form: "myPosts" })(MyPosts);
