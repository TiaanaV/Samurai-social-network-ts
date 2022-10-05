import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm } from "redux-form";
import AddPostForm from "./AddPostForm";

const AddPostFormRedux = reduxForm({ form: "my post" })(AddPostForm);

const MyPosts = React.memo((props) => {
  let postsElement = props.posts.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} />
  ));

  const addNewPost = (value) => {
    props.addPost(value.newPostText);
  };
  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.headline}>My posts</h3>
      <AddPostFormRedux onSubmit={addNewPost} />
      <div className={classes.posts}>{postsElement}</div>
    </div>
  );
});

export default MyPosts;
