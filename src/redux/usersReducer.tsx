import { usersAPI } from "../api/api";

const FOLLOWED:string = 'FOLLOW';
const UNFOLLOW:string = 'UNFOLLOW';
const SET_USERS:string = 'SET-USERS';
const SET_CURRENT_PAGE:string ='SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT:string ='SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING:string ='TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS:string ='TOGGLE_IS_FOLLOWING_PROGRESS';

// type InitialStateType = {
//     users:Array<number>,
//     pageSize:number,
//     totalUsersCount: number,
//     currentPage: number,
//     isFetching: boolean,
//     followingInProgress:Array<string>
// }

let initialState  = {
    users:[
      ] as Array<string> | Array<number> ,
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 3,
    isFetching:true,
    followingInProgress:[] as Array<number> ,
}

export type InitialStateType = typeof initialState;

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
    userId:number
    type: typeof FOLLOWED
}

type UnfollowSuccessActionType = {
    userId:number
    type: typeof UNFOLLOW
}

type SetUsersActionType = {
    users:Array<string>
    type: typeof SET_USERS
}

type SetCurrentPageActionType = {
    currentPage:number
    type: typeof SET_CURRENT_PAGE
}

type SetTotalUsersCountActionType = {
    totalUsersCount:number
    type: typeof SET_TOTAL_USERS_COUNT
}

type ToggleFollowingProgressActionType = {
    isFetching:boolean
    userId:number
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
}

export const followSuccess = (userId:number):FollowSuccessActionType => ({type: FOLLOWED, userId});
export const unfollowSuccess=(userId:number):UnfollowSuccessActionType =>( {type:UNFOLLOW,userId});
export const setUsers = (users:Array<string>):SetUsersActionType =>( {type:SET_USERS,users});
export const setCurrentPage = (currentPage:number):SetCurrentPageActionType =>( {type:SET_CURRENT_PAGE,currentPage});
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountActionType =>( {type:SET_TOTAL_USERS_COUNT,totalUsersCount});
export const toggleIsFetching = (isFetching:boolean) =>( {type:TOGGLE_IS_FETCHING,isFetching});
export const toggleFollowingProgress = (isFetching:boolean,userId:number):ToggleFollowingProgressActionType =>( {type:TOGGLE_IS_FOLLOWING_PROGRESS,isFetching,userId});

export const getUsers = (page:number,pageSize:number) => async(dispatch:any) =>{   dispatch(toggleIsFetching(true));
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