import { Dispatch } from "react";
import { actionTypes } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../../src/api/users-api";
import { UsersType } from "../types common/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UsersType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 3,
  isFetching: true,
  followingInProgress: [] as Array<number>, // array of userId
};

export type InitialStateType = typeof initialState;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'FOLLOWED':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };

    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };

    case 'SET_USERS':
      return { ...state, users: action.users };
    case 'SET_CURRENT_PAGE':
      return { ...state, currentPage: action.currentPage };
    case 'SET_TOTAL_USERS_COUNT':
      return { ...state, totalUsersCount: action.totalUsersCount };

    case 'TOGGLE_IS_FETCHING':
      return { ...state, isFetching: action.isFetching };
    case 'TOGGLE_IS_FOLLOWING_PROGRESS':
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      };
    default:
      return state;
    }
  };
  
  type ActionsTypes = InferActionsTypes<typeof actions>
  
  export const actions = {
   followSuccess:(userId: number | null) => ({ type: 'FOLLOWED', userId } as const),
   unfollowSuccess:(userId: number | null) => ({ type: 'UNFOLLOW', userId } as const),
   setUsers:(users: Array<UsersType>) => ({type: 'SET_USERS', users,} as const),
   setCurrentPage:(currentPage: number) => ({ type: 'SET_CURRENT_PAGE',currentPage } as const),
   setTotalUsersCount:(totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT',totalUsersCount} as const),
   toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
   toggleFollowingProgress:(isFetching: boolean,userId: number) => ({type: 'TOGGLE_IS_FOLLOWING_PROGRESS',isFetching,userId,
  } as const)
}


// type GetStateType = () => AppStateType;
// type DispatchType = () => Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes >


export const getUsers = (page: number, pageSize: number): ThunkType => async (
  dispatch
) => {
  dispatch(actions.toggleIsFetching(true));
  actions.setCurrentPage(page);
  let data = await usersAPI.getUsers(page, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

export const follow = (userId: number ): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = await usersAPI.follow(userId);
  if (data.resultCode === 0) {
    dispatch(actions.followSuccess(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let data = await usersAPI.unfollow(userId);
  if (data.resultCode === 0) {
    dispatch(actions.unfollowSuccess(userId));
  }
  dispatch(actions.toggleFollowingProgress(false, userId));
};

export default usersReducer;
