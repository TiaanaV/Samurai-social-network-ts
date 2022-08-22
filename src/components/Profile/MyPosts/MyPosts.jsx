import { debuggerStatement } from "@babel/types";
import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  debugger;
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
        <textarea
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
