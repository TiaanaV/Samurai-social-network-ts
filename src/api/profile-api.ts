import { savePhoto } from './../redux/profileReducer';
import { ContactsType, PhotosType, ProfileType } from "../types common/types";
import { instance, ResultCodeEnum,APIResponseType } from "./api";

type SavePhotoResponseDataType = {
  photos:PhotosType
}

export const profileAPI = {
    async getProfileInfo(userId:number){ 
        const response = await instance.get<ProfileType>(`profile/` + userId);
    return response.data;
    },
    async getStatus(userId:number){
      const response =  await instance.get<string>(`profile/status/`+ userId)
      return response.data;
    },
    updateStatus(status:string){
      return instance.put<APIResponseType>(`profile/status`,
      {status:status}
      )

    },
   async savePhoto(photoFile:File){
      const formData = new FormData();
      formData.append("image",photoFile);

      const response =  await instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`,formData,{ 
        headers:{
        } 
      })
      return response.data
    },
    async saveProfile(profile:ProfileType){
     const response = await instance.put<APIResponseType<ProfileType>>(`profile/`,profile)
     return response.data
    }
   
}
