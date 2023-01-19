 import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth:false,
    captchaUrl:null as string | null, // if null,then captcha is not required
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState,action:any):InitialStateType => {
    switch(action.type){
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return{
                ...state,
                ...action.payload
            };
       
            default:
                return state;
            }
}

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email:string | null
    login:string | null
    isAuth:boolean
} 
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

const setAuthUserData =(id:number | null,email:string | null,login:string | null,isAuth:boolean):SetAuthUserDataActionType => ({type: SET_USER_DATA, payload:{id,email,login,isAuth}});

type SetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
const setCaptchaUrlSuccess =(captchaUrl:string):SetCaptchaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}});


export const getAuthUserData =() => async(dispatch:any) => {
   let data = await authAPI.authMe();
        if (data.resultCode === 0) {
          let { id, email, login } = data.data;
         dispatch(setAuthUserData(id, email, login,true));
        }
    }

export const login =(email:string,password:string,rememberMe:boolean,captcha:null|undefined) => async(dispatch:any) => {
    const response = await authAPI.login(email,password,rememberMe,captcha);
                if (response.data.resultCode === 0) {
                    dispatch(getAuthUserData()
                    );
                } else{
                    if(response.data.resultCode === 10){
                        dispatch(getCaptchaUrl())
                    }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                    dispatch(stopSubmit("login",{_error:message}))
                } 
    }

export const logout = () => async(dispatch:any) => {
    let response =  await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null,null,null,false));
            }
    }

export const getCaptchaUrl = () => async(dispatch:any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrlSuccess(captchaUrl))
        }
export default authReducer;