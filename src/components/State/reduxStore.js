import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import authReducer from './authReducer'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import sidebarReducer from './sidebarReducer'
import usersReducer from './usersReducer'

// const middleware = getDefaultMiddleware({
//         immutableCheck: false,
//         serializableCheck: false,
//         thunk: true,
//       });

const store = configureStore( {
     reducer: {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        sidebar: sidebarReducer,
        usersPage: usersReducer,
        auth: authReducer,
        app: appReducer
        
},
// middleware,
// devTools: process.env.NODE_ENV !== 'production',
 })


window.store = store 

export default store

