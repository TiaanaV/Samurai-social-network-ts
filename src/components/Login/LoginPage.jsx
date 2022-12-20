import { connect } from "react-redux";
import { Navigate } from "react-router";
import React from "react";
import { LoginReduxForm } from "./LoginForm";
import { login } from "../../redux/authReducer";
import classes from "./LoginForm.module.css";

const LoginPage = (props) => {
  const onSubmit = (formDate) => {
    props.login(
      formDate.email,
      formDate.password,
      formDate.rememberMe,
      formDate.captcha
    );
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div className={classes.loginForm}>
      <h1 className={classes.pageTitle}>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(LoginPage);
