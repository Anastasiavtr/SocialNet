
import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import * as axios from 'axios'
import Profile from './Profile';
import {getUserProfile, getUserStatus, updateUserStatus, savePhoto} from '../State/profileReducer'
import {useParams} from 'react-router-dom'
import {Navigate} from 'react-router-dom'
import { compose } from 'redux'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { withRouter } from '../../hoc/withRouter';
import { saveUpdatedProfile } from '../State/profileReducer';
import { setEditMode } from '../State/profileReducer';

const ProfileContainer = (props) => {
  
const profile = useSelector(state => state.profilePage.profile )
const status = useSelector(state => state.profilePage.status)
const authUserId = useSelector(state =>state.auth.userId )
const isAuth = useSelector(state => state.auth.isAuth)
const isEdit = useSelector(state => state.profilePage.isEdit )

const dispatch = useDispatch()
const getUProfile = (userId) => {dispatch(getUserProfile(userId))}
const getUStatus = (status) => {dispatch(getUserStatus(status))}
const updateUStatus = (userId) => {dispatch(updateUserStatus(userId))}
const saveMainPhoto = (file) => {dispatch(savePhoto(file))}
const saveProfile = (profile, setStatus) => {dispatch(saveUpdatedProfile(profile, setStatus))}
const editMode = (isEdit) => {dispatch(setEditMode(isEdit))}
let params = useParams()

    useEffect(() => { 
        let userId = params.userId
        if (!userId) {
            userId = authUserId; //no id - owner
        if (!userId){
        withAuthRedirect()
        }
    } 
        getUProfile(userId)
        getUStatus(userId)
    }, [params.userId])


     return( <Profile isOwner={!params.userId} editMode={editMode} saveProfile={saveProfile} savePhoto={saveMainPhoto} updateUserStatus={updateUStatus} profile={profile} status={status} isEdit={isEdit} isAuth={isAuth}/>
)}  
export default ProfileContainer

// export default compose(
//     connect(mapStateToProps,
//          {getUserProfile, getUserStatus, updateUserStatus}),
//    withRouter, 
// withAuthRedirect
// )(ProfileContainer)
//     const mapStateToProps = (state) => ({ 
//     profile: state.profilePage.profile,
//     status: state.profilePage.status,
//     authUserId: state.auth.userId,
//     isAuth: state.auth.isAuth
// })



//     const TakeParams = (props) => {
//     return <ProfileContainer {...props} params={useParams()} />
// }
// let AuthRedirectComponent = withAuthRedirect(TakeParams)
// export default connect(mapStateToProps, {getUserProfile})(AuthRedirectComponent)

 

// const TakeParams = (props) => {
//     return <ProfileContainer {...props} params={useParams()} />
// }




 

   