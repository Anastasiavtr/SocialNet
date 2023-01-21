import { getAuthUserData } from "./authReducer"

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

export type InitialStateType = {
    initialized: boolean 
}
let initialState: InitialStateType = {
     initialized: false  
}

const appReducer = (state = initialState, action: any): InitialStateType => {

   
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

 
export const initializeSuccess = () : InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})

export const initializeApp = () => (dispatch: any) => {

      let promise = dispatch(getAuthUserData()) 
      promise.then(() => {
         dispatch(initializeSuccess())
      })     
        }   
    

        

export default appReducer
