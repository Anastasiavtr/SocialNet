import { authAPI } from "../../api/api"
import { securityAPI } from "../../api/api"
const SET_USER_DATA = 'network/auth/SET-USER-DATA'
const DELETE_AUTH_USER = 'network/auth/DELETE-AUTH-USER'
const GET_CAPTCHA_URL_SUCCESS = 'network/auth/GET-CAPTCHA-URL-SUCCESS'

let initialState = {
    login:null,
    userId:null,
    email:null,
   isAuth: false,
   captchaUrl: null,
}

const authReducer = (state = initialState, action) => {
  
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

export const setUser = (login, userId, email) => ({type: SET_USER_DATA, payload: {login, userId, email}})
export const deleteAuthUser = () => ({type: DELETE_AUTH_USER})
export const getCaptchaUrlSuccess = (captchaUrl) => ({type: GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}})

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.me()
           if (response.data.resultCode === 0) {
             let {login, id, email} = response.data.data
             dispatch(setUser(login, id, email)) 
           }
        }   

export const login = (email, password, rememberMe, captcha, setStatus, setSubmitting) => async (dispatch) => {
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

        
export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl()
          const captchaUrl = response.data.url     
            dispatch(getCaptchaUrlSuccess(captchaUrl)) 
           
            }      
        
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
          if (response.data.resultCode === 0) {
           dispatch(deleteAuthUser()) 
        }
      }   
  
   
export default authReducer
