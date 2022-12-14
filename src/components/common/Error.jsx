import React from "react";
import classes from "./Error.module.css";

const Error = (props) => {
  return (
    <div className={classes.errorBox}>
      <h3>
        Sorry!
        <br />
        {props.error}
      </h3>
      {/* There was some unexpected error. We are already trying to fix it. */}
      <img
        src="https://images.unsplash.com/photo-1555861496-0666c8981751?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        width={"400px"}
      />
    </div>
  );
};

export default Error;
