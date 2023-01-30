import React, { useEffect } from 'react'
import {
  getUserProfile,
  getUserStatus,
  updateUserStatus,
  savePhoto,
} from '../State/profileReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { saveUpdatedProfile } from '../State/profileReducer'
import { actions } from '../State/profileReducer'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPosts from './MyPosts/MyPosts'
import { useAppSelector, useAppDispatch } from '../../Types/hooks'
import { PostType, ProfileType } from '../../Types/types'

type PropsType = {
  profile: ProfileType | null
  status: string | null
  authUserId: number | null
  isAuth: boolean
  isEdit: boolean
  posts: Array<PostType>
}

const Profile: React.FC<PropsType> = (props) => {
  const profile = useAppSelector((state) => state.profilePage.profile)
  const status = useAppSelector((state) => state.profilePage.status)
  const authUserId = useAppSelector((state) => state.auth.userId)
  // const isAuth = useAppSelector((state) => state.auth.isAuth)
  const isEdit = useAppSelector((state) => state.profilePage.isEdit)

  const dispatch = useAppDispatch()
  const getUProfile = (userId: number) => {
    dispatch(getUserProfile(userId))
  }
  const getUStatus = (userId: number) => {
    dispatch(getUserStatus(userId))
  }
  const updateUStatus = (status: string) => {
    dispatch(updateUserStatus(status))
  }
  const saveMainPhoto = (file: any) => {
    dispatch(savePhoto(file))
  }
  const saveProfile = (profile: ProfileType, setStatus: any) => {
    dispatch(saveUpdatedProfile(profile, setStatus))
  }
  const editMode = (isEdit: boolean) => {
    dispatch(actions.setEditMode(isEdit))
  }

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    let userId: number | null = Number(params.userId)

    if (!userId) {
      userId = authUserId //no id - owner

      if (!userId) {
        navigate('/login/')
      }
    }
    getUProfile(userId as number)
    getUStatus(userId as number)
  }, [params.userId])

  //   if (!isAuth) {
  //     return <Navigate to="/login/" />
  //   }

  return (
    <main>
      <ProfileInfo
        isEdit={isEdit}
        isOwner={!params.userId}
        editMode={editMode}
        saveProfile={saveProfile}
        savePhoto={saveMainPhoto}
        profile={profile}
        status={status}
        updateUserStatus={updateUStatus}
      />
      <MyPosts posts={props.posts} />
    </main>
  )
}

export default Profile

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
