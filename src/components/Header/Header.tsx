import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../State/authReducer';
 import { NavLink } from 'react-router-dom';
        import s from './Header.module.css';
import { useAppDispatch, useAppSelector } from '../../Types/hooks';

type PropsType = {
    isAuth: boolean 
    loginName: string | null
}

const Header:React.FC<PropsType> = (props) => {
        
 const isAuth = useAppSelector(state => state.auth.isAuth) 
 const loginName = useAppSelector(state =>state.auth.login)
 const dispatch = useAppDispatch()
 const logout = () => {dispatch(logout())}
           
 
            return(
                <header className={s.header}>
                   <img src='https://flyclipart.com/thumb2/image-741067.png'/>
                    <div className={s.loginBlock}>
                        {isAuth 
                        ? <div>{loginName} <button onClick={logout}>Log out</button></div>
                       : <NavLink to='/login/'>Login</NavLink>}               
                       </div>          
              </header>
            )
        }
        
 export default Header;
    




