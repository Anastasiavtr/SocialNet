import { UserType } from './../../Types/types';

import { usersAPI } from "../../api/api"


const SET_USERS = 'SET-USERS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_USERS_COUNT = 'SET-TOTAL-USERS-COUNT'
const SET_IS_FETCHING = 'SET-IS-FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE-IS-FOLLOWING-PROGRESS'
const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'


type InitialStateType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number> // array of users ids
}  
let initialState: InitialStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
}  

const usersReducer = (state = initialState, action: any): InitialStateType => {
    
    switch (action.type) {
        case TOGGLE_FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId) {
                        return {...user, followed: !user.followed}
                    }
                    return user
                })
            }

case SET_USERS: {
    return {...state, users:action.users}
}
case SET_CURRENT_PAGE: {
    return {...state, currentPage:action.currentPage}
}
case SET_TOTAL_USERS_COUNT: {
    return {...state, totalUsersCount:action.count}
}
case SET_IS_FETCHING: {
    return {...state, isFetching:action.isFetching}
}
case TOGGLE_IS_FOLLOWING_PROGRESS: {
    return {...state, 
         followingInProgress: action.isFetching
         ? [...state.followingInProgress, action.userId]
         : state.followingInProgress.filter(id => id != action.userId)           
    }        
}

        default:
            return state;
        }
    }
      

    type ToggleUserFollowActionType = {
        type: typeof TOGGLE_FOLLOW
         userId: number
    }
    type SetUsersActionType = {
        type: typeof SET_USERS
         users: Array<UserType>
    }
    type SetCurrentPageActionType = {
        type: typeof SET_CURRENT_PAGE
         currentPage: number
    }
    type SetTotalUsersCountActionType = {
        type: typeof SET_TOTAL_USERS_COUNT
         count:number
    }
    type ToggleIsFetchingActionType = {
        type: typeof SET_IS_FETCHING
         isFetching: boolean
    }
    type ToggleFollowingProgressActionType = {
        type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
         isFetching: boolean
          userId: number
    }
export const toggleUserFollow = (userId: number): ToggleUserFollowActionType => ({type: TOGGLE_FOLLOW, userId})
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type:SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type:SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountActionType  => ({type: SET_TOTAL_USERS_COUNT, count:totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type:SET_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type:TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId})


export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: any) => {
            dispatch(toggleIsFetching(true))
            dispatch(setCurrentPage(page))
           let response = await usersAPI.getUsers(page, pageSize)
            dispatch(setCurrentPage(page))
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount))
    }
}

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any) => {
    dispatch(toggleFollowingProgress(true, userId))
     let response = await apiMethod(userId)
     if (response.resultCode === 0) { 
        dispatch(toggleUserFollow(userId))
     }
    dispatch(toggleFollowingProgress(false, userId))
}

export const unfollow = (userId: number) => {
    return async (dispatch: any) => { 
          followUnfollowFlow(dispatch, userId,
             usersAPI.unfollow.bind(userId))          
            }
}
export const follow = (userId: number) => {
    return async (dispatch: any) => {               
          followUnfollowFlow(dispatch, userId,
            usersAPI.follow.bind(userId))
            }
}

export default usersReducer

