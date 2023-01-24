import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
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
import Friends from './components/Navbar/Friends/Friends';
import { Provider } from 'react-redux';
import store from './components/State/reduxStore'
import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from './components/NofFound/NotFound';
import Dialogs from './components/Dialogs/Dialogs';

// const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs.jsx'));

const App = (props) => {

  useEffect(( ) => {
    props.initializeApp();
  }, [] )

 if (!props.initialized) {
  return <Preloader />

}
  return (
   
    <div className="app-wrapper">
    <Header />
    <Navbar/>
    <div className='app-wrapper-content'> 
    <Suspense fallback={<Preloader/>}>
    <Routes> 
    <Route path="/" element={<Navigate to="/profile" />} />
    <Route path='/profile/:userId' element={<Profile/>}/> 
    <Route path='/profile/' element={<Profile/>}/>
    <Route path='/dialogs/*' element={<Dialogs/> }/>
    <Route path='/login/' element={<Login />}/>
    <Route path='/users' element={<Users />} />
    <Route path='/news' element={<News/>}/>
    <Route path='/music' element={<Music/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/profile/:userId' element={<Friends/>}/>
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
