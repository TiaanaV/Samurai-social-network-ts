import { connect } from "react-redux";
import { Navigate } from "react-router";
import React from "react";
import { LoginReduxForm } from "./LoginForm";
import { login } from "../../redux/authReducer";
import classes from "./LoginForm.module.css";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  captchaUrl:string | null
  isAuth:boolean
}
type MapDispatchPropsType = {
  login:(email:string,password:string,rememberMe:boolean,captcha:string) => void
}

export type LoginFormValuesType = {
  email:string
  password:string
  rememberMe:boolean
  captcha:string
}


const LoginPage:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formDate:LoginFormValuesType) => {
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

const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect<MapStatePropsType,MapDispatchPropsType, undefined,AppStateType>(mapStateToProps, { login })(LoginPage);
