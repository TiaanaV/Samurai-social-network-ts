import React from "react";
import { LoginReduxForm } from "./LoginForm";

const LoginPage = (props) => {
  const onSubmit = (formDate) => {
    console.log(formDate);
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

export default LoginPage;
