import { useSelector } from 'react-redux';
import { useEffect } from 'react';
 import s from './Friends.module.css'
        import Friend from './Friend/Friend'
        import { useAppSelector } from '../../../Types/hooks';
import { FriendsType } from '../../State/sidebarReducer';


type PropsType = {
friends: FriendsType
        }

const Friends:React.FC<PropsType> = (props) => {

const friends = useAppSelector(state => state.sidebar )

    return ( 
        
                <section className={s.friends}>
                <h2>Friends online</h2>
                <div  className={s.friendsItems}>
        
                {friends.friends.map(u => {
                return <Friend key={u.id} name={u.name} id={u.id}/>
            })} 
         </div>
        </section>
            )
        }
        

export default Friends;
