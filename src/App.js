import './App.css'
import React from 'react'
import Header from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar'
import Profile from './components/Profile/Profile'
import { HashRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users/Users'
import { Login } from './login/login'
import { useEffect } from 'react'
import { initializeApp } from './components/State/appReducer'
import Preloader from './components/Preloader/Preloader'
import { connect } from 'react-redux'
import Friends from './components/Navbar/Friends/Friends'
import { Provider } from 'react-redux'
import store from './components/State/reduxStore'
import { Suspense } from 'react'
import { Navigate } from 'react-router-dom'
import NotFound from './components/NofFound/NotFound'
import Dialogs from './components/Dialogs/Dialogs'
import { useAppDispatch, useAppSelector } from './Types/hooks'

const ChatPage = React.lazy(() => import('./pages/Chat/chatPage'))

const App = (props) => {
  const initialized = useAppSelector((state) => state.app.initialized)
  const dispatch = useAppDispatch()
  const initializeAllApp = () => {
    dispatch(initializeApp())
  }

  useEffect(() => {
    initializeAllApp()
  }, [])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <div className="app-wrapper">
      <Header />
      <div className="container">
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Preloader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/profile" />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/profile/" element={<Profile />} />
              <Route path="/dialogs/*" element={<Dialogs />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/users" element={<Users />} />
              <Route path="/chat/" element={<ChatPage />} />
              <Route path="/profile/:userId" element={<Friends />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
const MainApp = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  )
}

export default MainApp
