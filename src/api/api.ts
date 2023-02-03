import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "90f162c3-67da-435f-84ba-4af89102403f"},  
});


export enum ResultCodeEnum{
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptchaEnum{
  CaptchaIsRequired = 10
}

export type APIResponseType<D = {},RC = ResultCodeEnum> = {
  data: D
  messages: Array<string>
  resultCode:RC
}