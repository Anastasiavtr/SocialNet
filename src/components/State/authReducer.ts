
import { authAPI } from "../../api/api"
import { securityAPI } from "../../api/api"
const SET_USER_DATA = 'network/auth/SET-USER-DATA'
const DELETE_AUTH_USER = 'network/auth/DELETE-AUTH-USER'
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET-CAPTCHA-URL-SUCCESS'

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

const authReducer = (state = initialState, action: any): InitialStateType => {
  
    switch (action.type) {
    case SET_USER_DATA : {
         return {
        ...state,
        ...action.payload,
         isAuth:true,
    }      
    }
    case DELETE_AUTH_USER: {
     return {
      ...state,
      ...initialState
     }
    }
     case GET_CAPTCHA_URL_SUCCESS: {
      return {
       ...state,
      ...action.payload
      }  
    }     
    default:
        return state;
   }
}

type setUserPayloadType = {
  login: string
  userId: number
  email: string
}

type SetUserActionType = {
  type: typeof SET_USER_DATA, 
  payload: setUserPayloadType
   
}

export const setUser = (login: string, userId: number, email: string): SetUserActionType => 
({type: SET_USER_DATA, payload: {login, userId, email}})


type DeleteAuthUserActionType = {
  type: typeof DELETE_AUTH_USER
}
export const deleteAuthUser = (): DeleteAuthUserActionType => ({type: DELETE_AUTH_USER})


type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS
  payload: {captchaUrl: string | null }
}

export const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType  =>
 ({type: GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}})

export const getAuthUserData = () => async (dispatch: any) => {
  let response = await authAPI.me()
           if (response.data.resultCode === 0) {
             let {login, id, email} = response.data.data
             dispatch(setUser(login, id, email)) 
           }
        }   

export const login = (email: string, password: string, rememberMe: boolean, captcha: any, setStatus: any, setSubmitting: any) => async (dispatch: any) => {
 const response = await authAPI.login(email, password, rememberMe, captcha)
          
            if (response.data.resultCode === 0) {
            // success, get auth data
            dispatch(getAuthUserData()) 
            dispatch(getCaptchaUrlSuccess(null))
            } else {
              if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl()) 
              }  
            setStatus(response.data.messages)
            setSubmitting(false) 
            }
            }   

        
export const getCaptchaUrl = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaUrl()
          const captchaUrl = response.data.url     
            dispatch(getCaptchaUrlSuccess(captchaUrl)) 
           
            }      
        
export const logout = () => async (dispatch: any) => {
    let response = await authAPI.logout()
          if (response.data.resultCode === 0) {
           dispatch(deleteAuthUser()) 
        }
      }   
  
   
export default authReducer
