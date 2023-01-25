import { ThunkAction } from "@reduxjs/toolkit"
import { Action } from "redux"
import { authAPI, ResultCodeForCaptchaEnum } from "../../api/api"
import { securityAPI } from "../../api/api"
import { RootState } from "./reduxStore"
const SET_USER_DATA = "network/auth/SET-USER-DATA"
const DELETE_AUTH_USER = "network/auth/DELETE-AUTH-USER"
const GET_CAPTCHA_URL_SUCCESS = "network/auth/GET-CAPTCHA-URL-SUCCESS"
import { ResultCodesEnum } from "../../api/api"

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

type setUserPayloadType = {
  login: string
  userId: number
  email: string
}

type SetUserActionType = {
  type: typeof SET_USER_DATA
  payload: setUserPayloadType
}

type ActionsType =
  | SetUserActionType
  | DeleteAuthUserActionType
  | GetCaptchaUrlSuccessActionType

export const setUser = (
  login: string,
  userId: number,
  email: string
): SetUserActionType => ({
  type: SET_USER_DATA,
  payload: { login, userId, email },
})

type DeleteAuthUserActionType = {
  type: typeof DELETE_AUTH_USER
}
export const deleteAuthUser = (): DeleteAuthUserActionType => ({
  type: DELETE_AUTH_USER,
})

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: { captchaUrl: string | null }
}

export const getCaptchaUrlSuccess = (
  captchaUrl: string | null
): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
})

type ThunksType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

export const getAuthUserData = (): ThunksType => async (dispatch) => {
  let authData = await authAPI.me()
  if (authData.resultCode === ResultCodesEnum.Success) {
    let { login, id, email } = authData.data
    dispatch(setUser(login, id, email))
  }
}

export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: any,
  setStatus: any,
  setSubmitting: any
): ThunksType => {
  return async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
      // success, get auth data
      dispatch(getAuthUserData())
      dispatch(getCaptchaUrlSuccess(null))
    } else {
      if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
        dispatch(getCaptchaUrl())
      }
      setStatus(loginData.messages)
      setSubmitting(false)
    }
  }
}

export const getCaptchaUrl = (): ThunksType => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
  const captchaUrl = response.data.url
  dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunksType => async (dispatch) => {
  let response = await authAPI.logout()
  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(deleteAuthUser())
  }
}

export default authReducer
