import React from "react";
import { Field, reduxForm } from "redux-form";
import { Forms } from "../common/FormsControl/FormsControl";
import { required } from "../../utils/validators/validator";
import classes from "./../common/FormsControl/FormsControls.module.css";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          component={Forms}
          typeField="input"
          name={"email"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type={"password"}
          component={Forms}
          typeField="input"
          name={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          type={"checkbox"}
          typeField="checkbox"
          component={Forms}
          name={"rememberMe"}
        />
        remember me
      </div>
      {props.error && (
        <div className={classes.formSummaryError}>{props.error}</div>
      )}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

export const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
