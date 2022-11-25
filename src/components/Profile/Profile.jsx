
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return(
    <main>
    <ProfileInfo isEdit={props.isEdit} isOwner={props.isOwner} editMode={props.editMode} saveProfile={props.saveProfile} savePhoto={props.savePhoto} profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
    <MyPostsContainer />
    </main>     
    )
}

export default Profile;