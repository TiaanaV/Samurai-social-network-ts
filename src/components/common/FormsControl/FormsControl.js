import React from "react";
import classes from "./FormsControls.module.css";

const FormsControl = ({input,meta,child,...props}) => {
    const hasError = meta.touched && meta.error;
    return(
        <div className={classes.formControl + " " + (hasError? classes.error : "")}>
            <div>
                {props.children}
            </div>
           {  hasError && <span>{meta.error}</span> }      
        </div>
    )
}

export const Forms = (props) => {
    const {input,meta,children, ...restProps} = props;
    return <FormsControl {...props}><props.typeField {...input} {...restProps}/></FormsControl> 
}