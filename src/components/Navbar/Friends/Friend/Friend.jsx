import s from './../Friends.module.css'
import { NavLink } from 'react-router-dom'

const Friend = ({id, name}) => {
   
    return  (
   <div>
      <NavLink to={'/profile/' + id}>
        <div  className={s.friendsImage}> 
         <img className={s.friendsImg}
    src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg" />
        </div>
     <div className={s.descriptionBlock}>{name}</div>
     </NavLink>
    </div>
)}
export default Friend