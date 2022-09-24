import { connect } from "react-redux";
import { Navigate } from "react-router";
import React from "react";
import { LoginReduxForm } from "./LoginForm";
import { login } from "../../redux/authReducer";

const LoginPage = (props) => {
  const onSubmit = (formDate) => {
    props.login(formDate.email, formDate.password, formDate.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(LoginPage);
