import './App.css';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import ProfileContainer from './components/Profile/ProfileContainer';
import {HashRouter} from 'react-router-dom';

import News from './components/News/News'
import Music from './components/Music/Music'
import Settings from './components/Settings/Settings'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Users from './components/Users/Users';
import Login from './login/login';
import { useEffect } from 'react';
import { initializeApp } from './components/State/appReducer';
import Preloader from './components/Preloader/Preloader';
import { connect } from 'react-redux';
import FriendsContainer from './components/Navbar/Friends/FriendsContainer';
import { Provider } from 'react-redux';
import store from './components/State/reduxStore'
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from './components/NofFound/NotFound';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.jsx'));

const App = (props) => {

  useEffect(( ) => {
    props.initializeApp();
  }, [] )

 if (!props.initialized) {
  return <Preloader />

}
  return (
   
    <div className="app-wrapper">
    <HeaderContainer />
    <Navbar/>
    <div className='app-wrapper-content'> 
    <Suspense fallback={<Preloader/>}>
    <Routes> 
    <Route path="/" element={<Navigate to="/profile" />} />
    <Route path='/profile/:userId' element={<ProfileContainer/>}/> 
    <Route path='/profile/' element={<ProfileContainer/>}/>
    <Route path='/dialogs/*' element={<DialogsContainer/> }/>
    <Route path='/login/' element={<Login />}/>
    <Route path='/users' element={<Users />} />
    <Route path='/news' element={<News/>}/>
    <Route path='/music' element={<Music/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/profile/:userId' element={<FriendsContainer/>}/>
    <Route path='*' element={<NotFound />} />
    </Routes>
    </Suspense>
    </div> 
    </div>
   
  );
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized  
  }

}
let AppContainer = connect(mapStateToProps,{initializeApp} )(App);

const MainApp = () => {
  return  <HashRouter>
  <Provider store={store}>
    <AppContainer />
</Provider>
  </HashRouter>
}

export default MainApp 
