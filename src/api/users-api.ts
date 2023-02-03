import { UsersType } from './../types common/types';
import { instance, APIResponseType } from "./api";


type GetItemsType = {
    items:Array<UsersType>
     totalCount:number
     error:string|null
   }
   
export const usersAPI = { 
    async getUsers(currentPage=1,pageSize=10){
    const response = await instance.get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}`
    );
    return response.data;
    },

    async unfollow(id:number){
      const response = await instance.delete<APIResponseType>(`follow/${id}`);
      return response.data;
    },

    async follow(id:number){
        const response = await instance.post<APIResponseType>(`follow/${id}`);
      return response.data;
    },
}

