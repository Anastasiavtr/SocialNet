import { profileAPI} from "../../api/api"


const ADD_POST = 'network/profile/ADD-POST'
const SET_USER_PROFILE = 'network/profile/SET-USER-PROFILE'
const SET_STATUS = 'network/profile/SET-STATUS'
const DELETE_POST = 'network/profile/DELETE-POST'
const SAVE_PHOTO_SUCCESS = 'network/profile/SAVE-PHOTO-SUCCESS'
const EDIT_MODE = 'network/profile/EDIT-MODE'

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you', likesCount: 2 },
        {id: 2, message:'It`s my first post', likesCount: 12 },
      ],
     profile: null,
     status: '',
     isEdit:false,
}
const profileReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case ADD_POST: {
           let post = action.newPostText
        return {
            ...state,
            posts: [...state.posts, {id: state.posts.length + 1, message: post, likesCount:0}]
    }  
        } 

    
        case SET_USER_PROFILE : {
            return {
             ...state,
             profile: action.profile
         } }
         case SET_STATUS: {
            return {
             ...state,
             status: action.status
         } }
        case DELETE_POST: {
            return {
                ...state,
                post: state.posts.filter(post => post.id != action.id )
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
            
        }
        case EDIT_MODE: {
            return {
                ...state,
                isEdit: action.isEdit
            }}
        default:
            return state;
        }
    }

export const addPost = (newPostText) => ( {type: ADD_POST, newPostText} )
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (id) => ({type:DELETE_POST, id})
export const savePhotoSuccess = (photos) => ({type:SAVE_PHOTO_SUCCESS, photos})
 export const setEditMode = (isEdit) => ({type:EDIT_MODE, isEdit})

export const getUserProfile = (userId) => {
    return async (dispatch) => {
      let response = await profileAPI.getProfile(userId)
       dispatch(setUserProfile(response.data))
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => {
        let response = await profileAPI.getStatus(userId)
             dispatch(setStatus(response.data))     
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
              dispatch(setStatus(status))}   
              }
            }           

         export const savePhoto = (file) => {
                return async (dispatch) => {
                    let response = await profileAPI.savePhoto(file)
                        if (response.data.resultCode === 0) {
                          dispatch(savePhotoSuccess(response.data.data.photos))}   
                          }
                        }   


           export const saveUpdatedProfile = (profile, setStatus ) => {
             return async (dispatch, getState) =>  { 
            //    const userId = getState().auth.userId   
                const response = await profileAPI.saveProfile(profile);    
              
                        if (response.data.resultCode === 0) {
                    //  let promise = dispatch(getUserProfile(userId))
                             dispatch(setUserProfile(profile))
                              dispatch(setEditMode(false)) 
                        }       
                          else {
                          setStatus(response.data.messages)
                        }
                         } 
                        }
           
                  
                                    
export default profileReducer

