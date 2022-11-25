import { useSelector } from 'react-redux';
import Friends from './Friends';
import { useEffect } from 'react';

const FriendsContainer = (props) => {

 let friends = useSelector(state => state.sidebar )

    return ( 
     <Friends friends={friends}/> 
    )
}

export default FriendsContainer;
