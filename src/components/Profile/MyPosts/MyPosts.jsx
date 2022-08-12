import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElement = props.posts.map((p) => (
    <Post message={p.message} likeCount={p.likeCount} />
  ));

  let newPostElement = React.createRef();
  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text);
    newPostElement.current.value = " ";
  };

  return (
    <div className={classes.postsBlock}>
      <h3 className={classes.headline}>My posts</h3>
      <div>
        <textarea
          ref={newPostElement}
          className={classes.newPostArea}
        ></textarea>
        <div />

        <div className={classes.buttonsArea}>
          <button className={classes.button} onClick={addPost}>
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
