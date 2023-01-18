
import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api";
import { PhotosType, PostsType, ProfileType } from "../types common/types";


const ADD_POST='profilePage/ADD-POST';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST'
const SAVE_PHOTO_SUCCESS ='profilePage/SAVE_PHOTO_SUCCESS';
const HAS_ERROR = 'profilePage/profile/HAS_ERROR';
const CLEAN_ERROR = 'profilePage/profile/CLEAN_ERROR ';



let initialState = {
    posts:[
        { id: 1, message: "Hi!", likeCount: 15 },
        { id: 2, message: "Yo!", likeCount: 45 },
        { id: 3, message: "Where are you?", likeCount: 55 },
      ] as Array<PostsType>,
      newPost:[] as Array<PostsType>,
      profile: null as ProfileType | null,
      status:"" as string,
      error:null as string | null,
}

export type InitialStateType = typeof initialState
const profileReducer = (state = initialState,action:any):InitialStateType => {

    switch(action.type){
        case ADD_POST:{
            let newPost = {
            id:4,
            message: action.newPostText,
            likeCount:0
            };
            return {...state,
                posts:[...state.posts,newPost],
            };
        }
        case SET_USER_PROFILE:{
            return {...state, profile: action.profile,
            }
        }
        case DELETE_POST:{
            return {...state, posts: state.posts.filter(p => p.id!=action.postId),
            } 
        }
        case SET_STATUS:{
            return {...state, status: action.status,
            } 
        }
        case SAVE_PHOTO_SUCCESS:{
            return {...state, profile:{...state.profile,photos:action.photos},
            } 
        }
        case HAS_ERROR:{
            return{
                ...state,
                ...action.payload
            }
        }
        // case CLEAN_ERROR:{
        //     return{
        //         ...state,
        //         ...action.payload = null
        //     } 
        // }

        default:
            return state;
        } 
    }

    type AddPostActionCreatorType = {
        type: typeof ADD_POST
        newPostText:string
    }
    export const addPostActionCreator = (newPostText:string):AddPostActionCreatorType => ({ type: ADD_POST,newPostText });

    type DeletePostActionType = {
        type: typeof DELETE_POST
        postId:number
    }
    export const deletePost = (postId:number):DeletePostActionType => ({ type: DELETE_POST, postId});

    type SetStatusActionType = {
        type:typeof SET_STATUS, 
        status:string
    }
    export const setStatus = ( status:string):SetStatusActionType => ({ type: SET_STATUS, status });

    type SetUserProfileActionType = {
        type:typeof SET_USER_PROFILE
        profile: ProfileType
    }
     const setUserProfile = (profile:ProfileType):SetUserProfileActionType => ({type:SET_USER_PROFILE,profile});

     type SavePhotoSuccessActionType = {
        type:typeof SAVE_PHOTO_SUCCESS
        photos:PhotosType
     }
     const savePhotoSuccess =(photos:PhotosType):SavePhotoSuccessActionType => ({type:SAVE_PHOTO_SUCCESS,photos});

     type ErrorType = {
      message:string
     }
     type HasErrorActionType = {
        type:typeof HAS_ERROR
        payload:{error:ErrorType | null}
     }
     const hasError = (error:ErrorType | null):HasErrorActionType => ({type:HAS_ERROR,payload:{error}});
    //  const cleanError = (error) => ({type:CLEAN_ERROR,payload:{error}}); 


    export const getProfileInfo = (userId:number) => {
        return (dispatch:any) =>{
            profileAPI.getProfileInfo(userId).then((data:any) => {
            dispatch(setUserProfile(data));
            });
        }
    }

    export const getStatus = (userId:number) => async(dispatch:any) =>{
        let response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data));
        }
    export const updateStatus = (status:string) => async(dispatch:any) =>{
        // try{
            let response = await profileAPI.updateStatus(status)
                 if(response.data.resultCode === 0){
                        dispatch(setStatus(status));
                    }
         } 
        //  catch(error) {
        //     let errorMessage = error.message;
        //     if(/\d/g.test(errorMessage)){
        //         errorMessage="There was some unexpected error. We are already trying to fix it."
        //     }
        //     dispatch(hasError(errorMessage))
        //     setTimeout(() => dispatch(hasError(null)),2000)
        //     }
        // }
        
    export const savePhoto = (file:string) => async(dispatch:any) =>{
         let response = await profileAPI.savePhoto(file)
                if(response.data.resultCode === 0){
                    dispatch(savePhotoSuccess(response.data.data.photos));
                }
         }

 export const saveProfile = (profile:ProfileType) => async(dispatch:any) =>{
        const userId = 25786;
        let response = await profileAPI.saveProfile(profile);

                if(response.data.resultCode === 0){
                   dispatch(getProfileInfo(userId))
                } else {
                    let errorType = response.data.messages[0];

                    if(errorType.includes(".")){
                        errorType = errorType.split(".",1);
                     } else if ( errorType.includes("Contacts->")){
                        errorType = errorType.split('(Contacts->').join(": ").split(')',1);
                    }

                    dispatch(stopSubmit("profile-edit",{_error: errorType}))
                    return Promise.reject(response.data.messages[0])
                }
            }
        
         
    

export default profileReducer;  