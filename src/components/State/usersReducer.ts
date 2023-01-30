import { AppDispatch, BaseThunkType, InferActionsTypes } from './reduxStore'
import { useAppDispatch, useAppSelector } from './../../Types/hooks'
import { UserType } from './../../Types/types'
import { RootState } from './reduxStore'
import { ResultCodesEnum } from '../../api/api'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { usersAPI } from '../../api/usersAPI'

const SET_USERS = 'network/USERS/SET-USERS' as const
const SET_CURRENT_PAGE = 'network/USERS/SET-CURRENT-PAGE' as const
const SET_TOTAL_USERS_COUNT = 'network/USERS/SET-TOTAL-USERS-COUNT' as const
const SET_IS_FETCHING = 'network/USERS/SET-IS-FETCHING' as const
const TOGGLE_IS_FOLLOWING_PROGRESS =
  'network/USERS/TOGGLE-IS-FOLLOWING-PROGRESS' as const
const TOGGLE_FOLLOW = 'network/USERS/TOGGLE-FOLLOW' as const
const SET_FILTER = 'network/USERS/SET-FILTER' as const

type InitialStateType = {
  users: Array<UserType>
  pageSize: number
  totalUsersCount: number
  currentPage: number
  isFetching: boolean
  followingInProgress: Array<number> // array of users ids
  filter: {
    term: string
    friend: string
  }
}
let initialState: InitialStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  filter: {
    term: '',
    friend: '',
  },
}
export type FilterType = typeof initialState.filter

const usersReducer = (
  state = initialState,
  incomingAction: Action
): InitialStateType => {
  const action = incomingAction as ActionsType
  switch (action.type) {
    case TOGGLE_FOLLOW: {
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed }
          }
          return user
        }),
      }
    }
    case SET_USERS: {
      return { ...state, users: action.users }
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage }
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count }
    }
    case SET_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching }
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      }
    }
    case SET_FILTER: {
      return { ...state, filter: action.payload }
    }
    default:
      return state
  }
}
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
  toggleUserFollow: (userId: number) => ({
    type: TOGGLE_FOLLOW,
    userId,
  }),
  setUsers: (users: Array<UserType>) => ({
    type: SET_USERS,
    users,
  }),
  setCurrentPage: (currentPage: number) => ({
    type: SET_CURRENT_PAGE,
    currentPage,
  }),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  }),
  toggleIsFetching: (isFetching: boolean) => ({
    type: SET_IS_FETCHING,
    isFetching,
  }),
  toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId,
  }),
  setFilter: (filter: FilterType) => ({
    type: SET_FILTER,
    payload: filter,
  }),
}

type ThunkType = BaseThunkType<ActionsType>

export const requestUsers = (
  page: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setFilter(filter))
    let data = await usersAPI.getUsers(
      page,
      pageSize,
      filter.term,
      filter.friend
    )

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
  }
}
export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await usersAPI.follow(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.toggleUserFollow(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
  }
}
export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    let response = await usersAPI.unfollow(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.toggleUserFollow(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId))
  }
}

export default usersReducer
// type ActionsTypes =
//   | ToggleUserFollowActionType
//   | SetUsersActionType
//   | SetCurrentPageActionType
//   | SetTotalUsersCountActionType
//   | ToggleIsFetchingActionType
//   | ToggleFollowingProgressActionType

// type ToggleUserFollowActionType = {
//   type: typeof TOGGLE_FOLLOW
//   userId: number
// }
// type SetUsersActionType = {
//   type: typeof SET_USERS
//   users: Array<UserType>
// }
// type SetCurrentPageActionType = {
//   type: typeof SET_CURRENT_PAGE
//   currentPage: number
// }
// type SetTotalUsersCountActionType = {
//   type: typeof SET_TOTAL_USERS_COUNT
//   count: number
// }
// type ToggleIsFetchingActionType = {
//   type: typeof SET_IS_FETCHING
//   isFetching: boolean
// }
// type ToggleFollowingProgressActionType = {
//   type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
//   isFetching: boolean
//   userId: number
// }
// export const requestUsers = (page: number, pageSize: number) => {

//     return async (dispatch, getState) => {
//             dispatch(toggleIsFetching(true))
//             dispatch(setCurrentPage(page))
//            let response = await usersAPI.getUsers(page, pageSize)
//             dispatch(setCurrentPage(page))
//             dispatch(toggleIsFetching(false))
//             dispatch(setUsers(response.items))
//             dispatch(setTotalUsersCount(response.totalCount))
//     }
// }

// const _followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any) => {
//     dispatch(toggleFollowingProgress(true, userId))
//      let response = await apiMethod(userId)
//      if (response.resultCode === 0) {
//         dispatch(toggleUserFollow(userId))
//      }
//     dispatch(toggleFollowingProgress(false, userId))
// }

// export const unfollow = (userId: number): ThunkType => {
//     return async (dispatch) => {
//           _followUnfollowFlow(dispatch, userId,
//              usersAPI.unfollow.bind(userId))
//             }
// }
// export const follow = (userId: number): ThunkType => {
//     return async (dispatch) => {
//           _followUnfollowFlow(dispatch, userId,
//             usersAPI.follow.bind(userId))
//             }
// }
