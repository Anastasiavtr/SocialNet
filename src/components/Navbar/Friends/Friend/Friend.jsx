import s from './../Friends.module.css'
import { NavLink } from 'react-router-dom'

const Friend = (props) => {
   
    return  (
   <div>
      <NavLink to={'/profile/' + props.id}>
        <div  className={s.friendsImage}> 
         <img className={s.friendsImg}
    src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg" />
        </div>
     <div className={s.descriptionBlock}>{props.name}</div>
     </NavLink>
    </div>
)}
export default Friend