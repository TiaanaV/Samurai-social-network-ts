import React from "react"
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form"
import { FieldValidatorType } from "../../../utils/validators/validator"
import classes from "./FormsControls.module.css"

type FormControlPropsType = {
  meta: WrappedFieldMetaProps
};

const FormControl: React.FC<FormControlPropsType> = (props) => {
  const hasError = props.meta.touched && props.meta.error;
  return (
    <div
      className={classes.formControl + " " + (hasError ? classes.error : "")}
    >
      <div>{children}</div>
      {hasError && { error }}
    </div>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  return (
    <FormControl {...props}>
      <textarea {...props.input} {...props} />
    </FormControl>
  );
};
export const Input:React.FC<WrappedFieldProps> = (props) => {
  return (
    <FormControl {...props}>
      <input {...props.input} {...props} />
    </FormControl>
  );
};

export const createField = (
  placeholder: string|undefined,
  name: string,
  validators: Array<FieldValidatorType>,
  component: string | React.Component | React.FC,
  props = {},
  text = ""
) => (
  <div>
    <Field
      placeholder={undefined}
      validators={validators}
      component={component}
      {...props}
    />
    {text}
  </div>
);
