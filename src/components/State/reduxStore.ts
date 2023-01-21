import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import authReducer from './authReducer'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'

const store = configureStore( {
     reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
        
},
 })
 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
export default store

