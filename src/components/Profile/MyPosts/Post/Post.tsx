import React from "react";
import classes from "./Post.module.css";

type PropsType = {
  likeCount:number
  message:string
}

const Post:React.FC<PropsType> = (props) => {
  return (
    <div className={classes.item}>
      <img
        className={classes.avatarMini}
        src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
      />
      {props.message}
      <div className={classes.likes}>
        <span>likes</span> {props.likeCount}
      </div>
    </div>
  );
};

export default Post;
