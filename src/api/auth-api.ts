import { instance, ResultCodeEnum, APIResponseType, ResultCodeForCaptchaEnum} from "./api";


type MeResponseDataType = {
  id:number
  email:string
  login:string
}

type LoginResponseDataType = {
  userId:number
}

export const authAPI = {
    async authMe(){ 
        const response = await instance.get<APIResponseType<MeResponseDataType>>(`auth/me`);
    return response.data;
    },
    async login(email:string,password:string,rememberMe:boolean = false,captcha:string|null = null){
      const response = await instance.post<APIResponseType<LoginResponseDataType,ResultCodeEnum|ResultCodeForCaptchaEnum>>(`auth/login`, { email, password, rememberMe, captcha });
      return response.data;
    },
    logout(){
      return instance.delete(`auth/login`)
    }
}
