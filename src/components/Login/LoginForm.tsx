import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validator";
import { Input, Textarea } from "../common/FormsControl/FormsControl";
import styleField from "./../common/FormsControl/FormsControls.module.css";
import classes from "./LoginForm.module.css";
import { LoginFormValuesType } from "./LoginPage";

type OwnPropsType = {
  captchaUrl:string | null
}

const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType,OwnPropsType> & OwnPropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={classes.loginForm}>
      <div>
        <Field
          placeholder={"Email"}
          component={Input}
          typeField="input"
          name={"email"}
          validate={[required]}
          className={classes.entryField}
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
          className={classes.entryField}
        />
      </div>
      <div className={classes.checkbox}>
        <Field
          type={"checkbox"}
          component={Input}
          typefield="checkbox"
          name={"rememberMe"}
        />
        remember me
      </div>
      {props.error && (
        <div className={styleField.formSummaryError}>{props.error}</div>
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
        <button className={classes.button}>Login</button>
      </div>
    </form>
  );
};

export default LoginForm;

export const LoginReduxForm = reduxForm<LoginFormValuesType,OwnPropsType>({ form: "login" })(LoginForm);
