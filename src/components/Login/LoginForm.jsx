import React from "react";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import { Input, Textarea } from "../common/FormsControl/FormsControl";
import classes from "./../common/FormsControl/FormsControls.module.css";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          component={Input}
          typeField="input"
          name={"email"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          type={"password"}
          component={Input}
          typefield="input"
          name={"password"}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          type={"checkbox"}
          component={Input}
          typefield="checkbox"
          name={"rememberMe"}
        />
        remember me
      </div>
      {props.error && (
        <div className={classes.formSummaryError}>{props.error}</div>
      )}
      {props.captchaUrl ? <img src={props.captchaUrl} width={"200px"} /> : null}
      {props.captchaUrl ? (
        <Field
          component={Input}
          typefield="input"
          name={"captcha"}
          validate={[required]}
        />
      ) : null}

      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

export const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
