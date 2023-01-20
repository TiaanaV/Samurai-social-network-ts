import { createSelector } from '@reduxjs/toolkit'
import { AppStateType } from './redux-store';

 const getUsers= (state:AppStateType) =>{
    return state.usersPage.users;
      }

      export const getUsersSelector = (state:AppStateType) =>{
        return getUsers(state);
          } 

  export const getUsersSuper = createSelector(getUsers,(users) => {
   return users.filter(u => true);
  })
  export const getPageSize = (state:AppStateType) =>{
    return state.usersPage.pageSize;
  }

  export const getTotalUsersCount = (state:AppStateType) =>{
    return state.usersPage.totalUsersCount;
  }
  export const getCurrentPage = (state:AppStateType) =>{
    return state.usersPage.currentPage;
  }

  export const getIsFetching = (state:AppStateType) =>{
    return state.usersPage.isFetching;
  }
  export const getFollowingInProgress = (state:AppStateType) =>{
    return state.usersPage.followingInProgress;
  }