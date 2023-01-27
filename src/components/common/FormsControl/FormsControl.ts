import React from "react";
import { Field } from "redux-form";
import { FieldValidatorType } from "../../../utils/validators/validator";
import classes from "./FormsControls.module.css";

type FormControlParamsType = {
  meta:{
    touched:boolean
    error:string
  }
  children: React.ReactNode
};

type FormControlType = (params:FormControlParamsType) => React.ReactNode

const FormControl:FormControlType = ({meta:{touched,error},children}) => {
  const hasError = touched && error;
  return (
    <div
      className={classes.formControl + " " + (hasError ? classes.error : "")}
    >
      {props.children}
      <div>{hasError && <span>{props.meta.error}</span>}</div>
    </div>
  );
};

export const Textarea = (props) => {
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...props} />
    </FormControl>
  );
};
export const Input = (props) => {
  return (
    <FormControl {...props}>
      <input {...props.input} {...props} />
    </FormControl>
  );
};

export const createField = (
  placeholder: string,
  name: string,
  validators: Array<FieldValidatorType>,
  component: string | React.Component | React.FC,
  props = {},
  text = ""
) => (
  <div>
    <Field placeholder={placeholder}
      validators={validators}
      component={component}
      {...props}
    />{text}
  </div>
  );
