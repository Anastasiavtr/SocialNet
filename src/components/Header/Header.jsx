import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return(
        <header className={s.header}>
           <img src='https://flyclipart.com/thumb2/image-741067.png'/>
            <div className={s.loginBlock}>
                {props.isAuth 
                ? <div>{props.loginName} <button onClick={props.logout}>Log out</button></div>
               : <NavLink to='/login/'>Login</NavLink>}               
               </div>          
      </header>
    )
}

export default Header;