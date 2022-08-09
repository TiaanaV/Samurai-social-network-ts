import React from "react";
import classes from "./ProfileInfo.module.css";

const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img
          className={classes.wallPicture}
          src="https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8YWxvbmV8ZW58MHx8MHx8&w=1000&q=80"
        />
      </div>
      <div className={classes.descriptionBlock}>
        <img
          className={classes.avatar}
          src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
