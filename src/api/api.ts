import { ContactsType, ProfileType} from './../types common/types';
import axios from "axios";
import { PhotosType } from "../types common/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "90f162c3-67da-435f-84ba-4af89102403f"},  
});

type UsersAPIResponseType = {
 items:
  Array<{
    id:number
    name:string
    status:string
    photos:PhotosType
    followed:boolean}>
  totalCount:number
  error:string|null

}

type FollowUnfollowResponseType = {
  data: {
    userId:number
    }
  resultCode:ResultCodeEnum 
  messages:Array<string>
}

export const usersAPI = { 
    async getUsers(currentPage=1,pageSize=10){
    const response = await instance.get<UsersAPIResponseType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
    },

    async unfollow(id:number){
      const response = await instance.delete<FollowUnfollowResponseType>(`follow/${id}`);
      return response.data;
    },

    async follow(id:number){
        const response = await instance.post<FollowUnfollowResponseType>(`follow/${id}`);
      return response.data;
    },
}

export enum ResultCodeEnum{
  Success = 0,
  Error = 1
}

export enum ResultCodeForCaptcha{
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: {
    id:number
    email:string
    login:string}
  resultCode:ResultCodeEnum
  messages:Array<string>
}

type LoginResponseType = {
  data: {
    userId:number
    }
  resultCode:ResultCodeEnum | ResultCodeForCaptcha
  messages:Array<string>
}

export const authAPI = {
    async authMe(){ 
        const response = await instance.get<MeResponseType>(`auth/me`);
    return response.data;
    },
    async login(email:string,password:string,rememberMe:boolean = false,captcha:string|null = null){
      const response = await instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha });
      return response.data;
    },
    logout(){
      return instance.delete<LoginResponseType>(`auth/login`)
    }
}

type SecurityResponseType = {
  url:string
}

export const securityAPI = {
  async getCaptchaUrl(){ 
    const response = await instance.get<SecurityResponseType>(`security/get-captcha-url`)
    return response.data
    }
  }


type ProfileResponseType = {
  data:{
    userId:number 
    lookingForAJob:boolean
    lookingForAJobDescription: string 
    fullName: string 
    contacts: ContactsType 
    photos:PhotosType 
  }
}

type GetStatusResponseType = {
  userId:number
}

type UpdateStatusResponseType = {
  data: {
    status:string
    }
  resultCode:ResultCodeEnum 
  messages:Array<string>
}

type SavePhotoResponseType = {
  data: {photos:PhotosType} ///// тут ошибка 
  resultCode:ResultCodeEnum 
  messages:Array<string>
}

type SaveProfileResponseType = {
  messages:{
    messages:Array<string>
  }
  resultCode: ResultCodeEnum;
  data:{
    userId:number 
    lookingForAJob:boolean
    lookingForAJobDescription: string 
    fullName: string 
    contacts: ContactsType 
  }
}

export const profileAPI = {
    async getProfileInfo(userId:number){ 
        const response = await instance.get<ProfileResponseType>(`profile/` + userId);
    return response.data;
    },
    getStatus(userId:number){
      return instance.get<GetStatusResponseType>(`profile/status/`+ userId)
    },
    updateStatus(status:string){
      return instance.put<UpdateStatusResponseType>(`profile/status`,
      {status:status}
      )

    },
    savePhoto(photoFile:any){
      const formData = new FormData();
      formData.append("image",photoFile);

      return instance.put<SavePhotoResponseType>(`profile/photo`,formData,{ ///// тут ошибка  проверить!!!
        headers:{
        } 
      })
    },
    async saveProfile(profile:ProfileType){
     const response = await instance.put<SaveProfileResponseType>(`profile/`,profile)
     return response.data
    }
   
}
