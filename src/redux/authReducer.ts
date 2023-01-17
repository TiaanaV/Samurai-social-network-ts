// import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth:false,
    captchaUrl:null, // if null,then captcha is not required
}
const authReducer = (state = initialState,action:any) => {
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

const setAuthUserData =(id:number,email:string,login:string,isAuth:boolean) => ({type: SET_USER_DATA, payload:{id,email,login,isAuth}});
const setCaptchaUrlSuccess =(captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}});

// export const getAuthUserData =(id:number,email:string,login:string) => async(dispatch:any) => {
//    let data = await authAPI.authMe(id,email,login);
//         if (data.resultCode === 0) {
//           let { id, email, login } = data.data;
//          dispatch(setAuthUserData(id, email, login,true));
//         }
//     }

// export const login =(email,password,rememberMe,captcha) => async(dispatch) => {
//     const response = await authAPI.login(email,password,rememberMe,captcha);
//                 if (response.data.resultCode === 0) {
//                     dispatch(getAuthUserData());
//                 } else{
//                     if(response.data.resultCode === 10){
//                         dispatch(getCaptchaUrl())
//                     }
//                 let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
//                     dispatch(stopSubmit("login",{_error:message}))
//                 } 
//     }

// export const logout = () => async(dispatch) => {
//     let response =  await authAPI.logout()
//             if (response.data.resultCode === 0) {
//                 dispatch(setAuthUserData(null,null,null,false));
//             }
//     }

export const getCaptchaUrl = () => async(dispatch:any) => {
        const response = await securityAPI.getCaptchaUrl();
        const captchaUrl = response.data.url;
        dispatch(setCaptchaUrlSuccess(captchaUrl))
        }
export default authReducer;