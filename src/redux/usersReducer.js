import { usersAPI } from "../api/api";

const FOLLOWED = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE ='SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT ='SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING ='TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS ='TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users:[
    //     { id: 1, followed: true, fullName: "Dmitriy", avatar:"https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", status: 'Money is power', location:{city: "Sochi", country:"Russia",}},
    //     { id: 2, followed: false, name: "Andrey", avatar:"https://images.unsplash.com/photo-1497993950456-cdb57afd1cf1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80", status: 'Knowledge is power', location:{city: "Moscow", country:"Russia",}},
    //     { id: 3, followed: false, name: "Elena",avatar:"https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",status: 'On work', location:{city: "Krasnodar", country:"Russia",}},
    //     { id: 4,followed: false, name: "Kate", avatar:"https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",status: 'Trip', location:{city: "Minsk", country:"Belarus",}},
    //     { id: 5,followed: false, name: "Sergey", avatar:"https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=932&q=80",status: 'Boss is here', location:{city: "Sochi", country:"Russia",} },
      ],
    pageSize: 5,
    totalUsersCount:0,
    currentPage: 3,
    isFetching:true,
    followingInProgress:[],
}
const usersReducer = (state = initialState,action) => {
    switch(action.type){
        case FOLLOWED:
           return {...state, users: state.users.map(u => {
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
            return{...state,totalUsersCount: action.count
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

export const followSuccess =(userId) => ({type: FOLLOWED, userId});
export const unfollowSuccess=(userId) =>( {type:UNFOLLOW,userId});
export const setUsers=(users) =>( {type:SET_USERS,users});
export const setCurrentPage = (currentPage) =>( {type:SET_CURRENT_PAGE,currentPage});
export const setTotalUsersCount = (totalUsersCount) =>( {type:SET_TOTAL_USERS_COUNT,count:totalUsersCount});
export const toggleIsFetching = (isFetching) =>( {type:TOGGLE_IS_FETCHING,isFetching});
export const toggleFollowingProgress = (isFetching,userId) =>( {type:TOGGLE_IS_FOLLOWING_PROGRESS ,isFetching,userId});

export const getUsers = (currentPage,pageSize) => {
    return (dispatch) =>{ 

    dispatch(toggleIsFetching(true));
    usersAPI
        .getUsers(currentPage,pageSize)
        .then((data) => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
}
}

export const follow = (userId) => {
    return (dispatch) =>{ 
        dispatch(toggleFollowingProgress(true, userId));
                    usersAPI.follow(userId).then((data) => {
                      if (data.resultCode === 0) {
                    dispatch(followSuccess(userId));
                      }
                    dispatch(toggleFollowingProgress(false, userId));
                    });
    }
}

export const unfollow = (userId) => {
    return (dispatch) =>{ 
        dispatch(toggleFollowingProgress(true, userId));
                    usersAPI.unfollow(userId).then((data) => {
                      if (data.resultCode === 0) {
                    dispatch(unfollowSuccess(userId));
                      }
                    dispatch(toggleFollowingProgress(false, userId));
                    });
    }
}


export default usersReducer;