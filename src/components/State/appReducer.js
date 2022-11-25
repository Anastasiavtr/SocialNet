import { getAuthUserData } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'


let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action) => {

   
    switch (action.type) {
    case INITIALIZED_SUCCESS : {
         return {
        ...state,
        initialized:true,
    }      
    }
        
    default:
        return state;
   }
}


export const initializeSuccess = () => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch) => {

      let promise = dispatch(getAuthUserData()) 
      promise.then(() => {
         dispatch(initializeSuccess())
      })     
        }   
    

        

export default appReducer
