import { RootState } from './reduxStore';
import { getAuthUserData } from "./authReducer"
import { Action, ThunkAction } from '@reduxjs/toolkit';

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

export type InitialStateType = {
    initialized: boolean 
}
let initialState: InitialStateType = {
     initialized: false  
}

const appReducer = (state = initialState, incomingAction: Action): InitialStateType => {
    const action = incomingAction as ActionType
   
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

type ActionType = InitializedSuccessActionType
type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionType>

export const initializeApp = ():ThunkType => async (dispatch) => {

      const promise = dispatch(getAuthUserData()) 
     return await promise.then(() => {
         dispatch(initializeSuccess())
      })     
        }   
    

        

export default appReducer
