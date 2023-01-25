import { PostType, ProfileType, PhotosType } from "./../../Types/types"
import { profileAPI, ResultCodesEnum } from "../../api/api"
import { Action, ThunkAction } from "@reduxjs/toolkit"
import { RootState } from "./reduxStore"

const ADD_POST = "network/profile/ADD-POST"
const SET_USER_PROFILE = "network/profile/SET-USER-PROFILE"
const SET_STATUS = "network/profile/SET-STATUS"
const DELETE_POST = "network/profile/DELETE-POST"
const SAVE_PHOTO_SUCCESS = "network/profile/SAVE-PHOTO-SUCCESS"
const EDIT_MODE = "network/profile/EDIT-MODE"

export type InitialStateType = {
  posts: Array<PostType>
  profile: ProfileType | null
  status: string
  isEdit: boolean
  newPostText: string
}

let initialState: InitialStateType = {
  posts: [
    { id: 1, message: "Hi, how are you", likesCount: 2 },
    { id: 2, message: "It`s my first post", likesCount: 12 },
  ],
  profile: null,
  status: "",
  isEdit: false,
  newPostText: "",
}

const profileReducer = (
  state = initialState,
  incomingAction: Action
): InitialStateType => {
  const action = incomingAction as ActionsType
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [
          ...state.posts,
          {
            id: state.posts.length + 1,
            message: action.newPostText,
            likesCount: 0,
          },
        ],
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      }
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id != action.id),
      }
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    case EDIT_MODE: {
      return {
        ...state,
        isEdit: action.isEdit,
      }
    }
    default:
      return state
  }
}
type ActionsType =
  | AddPostActionType
  | SetUserProfileActionType
  | SetStatusActionType
  | DeletePostActionType
  | SavePhotoSuccessActionType
  | SetEditModeActionType

type AddPostActionType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPost = (newPostText: string): AddPostActionType => ({
  type: ADD_POST,
  newPostText,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile })

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})

type DeletePostActionType = {
  type: typeof DELETE_POST
  id: number
}
export const deletePost = (id: number): DeletePostActionType => ({
  type: DELETE_POST,
  id,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })

type SetEditModeActionType = {
  type: typeof EDIT_MODE
  isEdit: boolean
}
export const setEditMode = (isEdit: boolean): SetEditModeActionType => ({
  type: EDIT_MODE,
  isEdit,
})

type ThunksType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunksType => {
  return async (dispatch: any) => {
    let response = await profileAPI.getProfile(userId)

    dispatch(setUserProfile(response.data))
  }
}

export const getUserStatus = (userId: number): ThunksType => {
  return async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response.data))
  }
}

export const updateUserStatus = (status: string): ThunksType => {
  return async (dispatch: any) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(setStatus(status))
    }
  }
}

export const savePhoto = (file: any): ThunksType => {
  return async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(savePhotoSuccess(response.photos))
    }
  }
}

export const saveUpdatedProfile = (
  profile: ProfileType,
  setStatus: any
): ThunksType => {
  return async (dispatch: any, getState: any) => {
    //    const userId = getState().auth.userId
    const response = await profileAPI.saveProfile(profile)

    if (response.data.resultCode === 0) {
      //  let promise = dispatch(getUserProfile(userId))
      dispatch(setUserProfile(profile))
      dispatch(setEditMode(false))
    } else {
      setStatus(response.data.messages)
    }
  }
}

export default profileReducer
