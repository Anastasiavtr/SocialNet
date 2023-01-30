import { ThunkAction } from '@reduxjs/toolkit'
import { Action } from 'redux'
import { ResultCodeForCaptchaEnum } from '../../api/api'
import { BaseThunkType, InferActionsTypes, RootState } from './reduxStore'
import { ResultCodesEnum } from '../../api/api'
import { authAPI } from '../../api/authApi'
import { securityAPI } from '../../api/securityApi'

const SET_USER_DATA = 'network/auth/SET-USER-DATA' as const
const DELETE_AUTH_USER = 'network/auth/DELETE-AUTH-USER' as const
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET-CAPTCHA-URL-SUCCESS' as const

export type InitialStateType = {
  login: string | null
  userId: number | null
  email: string | null
  isAuth: boolean
  captchaUrl: string | null
}

let initialState: InitialStateType = {
  login: null,
  userId: null,
  email: null,
  isAuth: false,
  captchaUrl: null,
}

const authReducer = (
  state = initialState,
  incomingAction: Action
): InitialStateType => {
  const action = incomingAction as ActionsType

  switch (action.type) {
    case SET_USER_DATA: {
      return {
        ...state,
        ...action.payload,
        isAuth: true,
      }
    }
    case DELETE_AUTH_USER: {
      return {
        ...state,
        ...initialState,
      }
    }
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return state
  }
}

type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
  setUser: (login: string, userId: number, email: string) => ({
    type: SET_USER_DATA,
    payload: { login, userId, email },
  }),

  deleteAuthUser: () => ({
    type: DELETE_AUTH_USER,
  }),

  getCaptchaUrlSuccess: (captchaUrl: string | null) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
  }),
}

type ThunkType = BaseThunkType<ActionsType>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  let authData = await authAPI.me()
  if (authData.resultCode === ResultCodesEnum.Success) {
    let { login, id, email } = authData.data
    dispatch(actions.setUser(login, id, email))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any,
  setStatus: any,
  setSubmitting: any
): ThunkType => {
  return async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
      // success, get auth data
      dispatch(getAuthUserData())
      dispatch(actions.getCaptchaUrlSuccess(null))
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      setStatus(loginData.messages)
      setSubmitting(false)
    }
  }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl()
  const captchaUrl = data.url
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.deleteAuthUser())
  }
}

export default authReducer
