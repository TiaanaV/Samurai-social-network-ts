import React from "react";
import { Field } from "redux-form";
import classes from "./FormsControls.module.css";

const FormControl = (props) => {
    const hasError = props.meta.touched && props.meta.error
    return (
        <div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            {props.children}
            <div>
                {hasError && <span>{props.meta.error}</span>}
            </div>
        </div>
    )
}

export const Textarea = (props) => {
    return <FormControl {...props}><textarea {...props.input} {...props}/></FormControl>
}
export const Input = (props) => {
    return <FormControl {...props}><input {...props.input} {...props}/></FormControl>
}

export const createField = (placeholder,name,validators,component,props = {},text = "") => (
    <div>
        <Field
          placeholder={placeholder}
          name={name}
          validators={validators}
          component={component}
          {...props}
        />
      </div>
)
