import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css'
import FriendsContainer from './Friends/Friends';


const activeLink = link =>  link.isActive ? s.active : s.item;

const Navbar = (props) => {
    return (
<aside className={s.aside}>
  <nav>
  <ul className={s.item}> 
  <li><NavLink to="/profile" className={activeLink}>Profile</NavLink> </li>
  <li><NavLink to="/dialogs"className={activeLink}>Messages</NavLink> </li>
  <li><NavLink to="/users" className={activeLink}>Users</NavLink> </li>
  <li><NavLink to="/news" className={activeLink}>News</NavLink> </li>
  <li><NavLink to="/music" className={activeLink}>Music</NavLink> </li>
  <li><NavLink to="/settings" className={activeLink}>Settings</NavLink> </li>
</ul>
</nav>

<FriendsContainer/>
</aside>
 )
}
  

export default Navbar;