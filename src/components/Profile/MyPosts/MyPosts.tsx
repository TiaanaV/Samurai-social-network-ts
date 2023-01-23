import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import { reduxForm } from "redux-form";
import AddPostForm from "./AddPostForm";
import { PostsType } from "../../../types common/types";

type PropsType = {
  posts:Array<PostsType>
  addPost: (newPostText:string) => void
  onSubmit: () => void
}

const AddPostFormRedux = reduxForm({ form: "my post" })(AddPostForm);

const MyPosts:React.FC<PropsType> = React.memo((props) => {
  let postsElement = [...props.posts]
    .reverse()
    .map((p) => (
      <Post key={p.id} message={p.message} likeCount={p.likeCount} />
    ));

  const addNewPost = (value:string) => {
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
