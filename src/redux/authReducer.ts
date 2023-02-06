import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { ResultCodeEnum, ResultCodeForCaptchaEnum } from "../api/api";
import {securityAPI} from "../api/security-api"
import {authAPI} from "../api/auth-api"
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { Action } from "redux";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth:false,
    captchaUrl:null as string | null, // if null,then captcha is not required
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>


const authReducer = (state = initialState,action:ActionsTypes):InitialStateType => {
    switch(action.type){
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return{
                ...state,
                ...action.payload
            };
       
            default:
                return state;
            }
}

export const actions = {
   setAuthUserData:(id:number | null,email:string | null,login:string | null,isAuth:boolean) => ({type: 'SET_USER_DATA', payload:{id,email,login,isAuth}}),
   setCaptchaUrlSuccess:(captchaUrl:string) => ({type: 'GET_CAPTCHA_URL_SUCCESS', payload:{captchaUrl}}),
}

export const getAuthUserData = ():ThunkType => async(dispatch) => {
   let data = await authAPI.authMe();
        if (data.resultCode === ResultCodeEnum.Success) {
          let { id, email, login } = data.data;
         dispatch(actions.setAuthUserData(id, email, login,true));
        }
    }

export const login =(email:string,password:string,rememberMe:boolean,captcha:null|string):ThunkType => async(dispatch) => {
    const response = await authAPI.login(email,password,rememberMe,captcha);
                if (response.resultCode === ResultCodeEnum.Success) {
                    dispatch(getAuthUserData()
                    );
                } else{
                    if(response.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired){
                        dispatch(getCaptchaUrl())
                    }
                let message = response.messages.length > 0 ? response.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error:message}))
                } 
    }

export const logout = ():ThunkType => async(dispatch) => {
    let response =  await authAPI.logout()
            if (response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(actions.setAuthUserData(null,null,null,false));
            }
    }

export const getCaptchaUrl = ():ThunkType => async(dispatch) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.url;
        dispatch(actions.setCaptchaUrlSuccess(captchaUrl))
        }
export default authReducer;