import { usersAPI } from "../api/api";
import { UsersType } from "../types common/types";

const FOLLOWED:string = 'users/FOLLOW';
const UNFOLLOW:string = 'users/UNFOLLOW';
const SET_USERS:string = 'users/SET-USERS';
const SET_CURRENT_PAGE:string ='users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT:string ='users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING:string ='users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS:string ='users/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState  = {
    users:[
      ] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 3,
    isFetching:true,
    followingInProgress:[] as Array<number>, // array of userId
}

export type InitialStateType = typeof initialState

const usersReducer = (state = initialState,action:any):InitialStateType => {
    switch(action.type){
        case FOLLOWED:
           return {...state, users: state.users.map(u  => {
                if(u.id === action.userId){
                    return {...u,followed:true}
                }
                return u;
            })}

        case UNFOLLOW:
            return {...state, users: state.users.map(u => {
                if(u.id === action.userId){
                    return {...u,followed:false}
                }
                return u;
            })}

        case SET_USERS:
            return{...state,users:action.users

            }
        case SET_CURRENT_PAGE:
            return{...state,currentPage: action.currentPage 
            }
        case SET_TOTAL_USERS_COUNT:
            return{...state,totalUsersCount: action.totalUsersCount
            }

        case  TOGGLE_IS_FETCHING:
            return{...state,isFetching: action.isFetching
            }
        case  TOGGLE_IS_FOLLOWING_PROGRESS:
                return{
                    ...state,followingInProgress: action.isFetching? 
                    [...state.followingInProgress,action.userId]
                    :state.followingInProgress.filter(id => id!=action.userId)
                }
        default:
            return state;
    }
            
}

type FollowSuccessActionType = {
    userId:number | null
    type: typeof FOLLOWED
}

export const followSuccess = (userId:number | null):FollowSuccessActionType => ({type: FOLLOWED, userId});

type UnfollowSuccessActionType = {
    userId:number | null
    type: typeof UNFOLLOW
}
export const unfollowSuccess=(userId:number | null):UnfollowSuccessActionType =>( {type:UNFOLLOW,userId});

type SetUsersActionType = {
    users:Array<UsersType>
    type: typeof SET_USERS
}
export const setUsers = (users:Array<UsersType>):SetUsersActionType =>( {type:SET_USERS,users});

type SetCurrentPageActionType = {
    currentPage:number
    type: typeof SET_CURRENT_PAGE
}

export const setCurrentPage = (currentPage:number):SetCurrentPageActionType =>( {type:SET_CURRENT_PAGE,currentPage});

type SetTotalUsersCountActionType = {
    totalUsersCount:number
    type: typeof SET_TOTAL_USERS_COUNT
}
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType =>( {type:SET_TOTAL_USERS_COUNT,totalUsersCount});

type ToggleIsFetchingActionType = {
    isFetching:boolean
    type: typeof TOGGLE_IS_FETCHING
}
export const toggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType =>( {type:TOGGLE_IS_FETCHING,isFetching});

type ToggleFollowingProgressActionType = {
    isFetching:boolean
    userId:number
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
}
export const toggleFollowingProgress = (isFetching:boolean,userId:number):ToggleFollowingProgressActionType =>( {type:TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId});

export const getUsers = (page:number,pageSize:number) => async(dispatch:any) =>{dispatch(toggleIsFetching(true));
    setCurrentPage(page);
   let data = await usersAPI.getUsers(page,pageSize)
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
    }


export const follow = (userId:number) => async(dispatch:any) => { 
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.follow(userId)
                      if (data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                      }
                    dispatch(toggleFollowingProgress(false, userId));
    }

export const unfollow = (userId:number) => async(dispatch:any) =>{ 
        dispatch(toggleFollowingProgress(true, userId));
        let data = await usersAPI.unfollow(userId)
                      if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                      }
                    dispatch(toggleFollowingProgress(false, userId));        
    }


export default usersReducer;