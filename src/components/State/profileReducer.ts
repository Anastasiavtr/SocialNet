import { PostType, ProfileType, PhotosType } from './../../Types/types'
import { ResultCodesEnum } from '../../api/api'
import { Action, ThunkAction } from '@reduxjs/toolkit'
import { BaseThunkType, InferActionsTypes, RootState } from './reduxStore'
import { profileAPI } from '../../api/profileApi'

const ADD_POST = 'network/profile/ADD-POST' as const
const SET_USER_PROFILE = 'network/profile/SET-USER-PROFILE' as const
const SET_STATUS = 'network/profile/SET-STATUS' as const
const DELETE_POST = 'network/profile/DELETE-POST' as const
const SAVE_PHOTO_SUCCESS = 'network/profile/SAVE-PHOTO-SUCCESS' as const
const EDIT_MODE = 'network/profile/EDIT-MODE' as const

export type InitialStateType = {
  posts: Array<PostType>
  profile: ProfileType | null
  status: string
  isEdit: boolean
}

let initialState: InitialStateType = {
  posts: [
    { id: 1, message: 'Hi, how are you', likesCount: 2 },
    { id: 2, message: 'It`s my first post', likesCount: 12 },
  ],
  profile: null,
  status: '',
  isEdit: false,
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
type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
  addPost: (newPostText: string) => ({
    type: ADD_POST,
    newPostText,
  }),
  setUserProfile: (profile: ProfileType) => ({
    type: SET_USER_PROFILE,
    profile,
  }),
  setStatus: (status: string) => ({
    type: SET_STATUS,
    status,
  }),
  deletePost: (id: number) => ({
    type: DELETE_POST,
    id,
  }),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: SAVE_PHOTO_SUCCESS,
    photos,
  }),
  setEditMode: (isEdit: boolean) => ({
    type: EDIT_MODE,
    isEdit,
  }),
}

type ThunkType = BaseThunkType<ActionsType>

export const getUserProfile = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
  }
}

export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
  }
}

export const updateUserStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status))
    }
  }
}

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(data.data.photos))
    }
  }
}

export const saveUpdatedProfile = (
  profile: ProfileType,
  setStatus: any
): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.saveProfile(profile)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setUserProfile(profile))
      dispatch(actions.setEditMode(false))
    } else {
      setStatus(response.messages)
    }
  }
}

export default profileReducer
