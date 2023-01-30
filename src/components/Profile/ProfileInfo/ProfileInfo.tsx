import Preloader from '../../Preloader/Preloader'
import s from './ProfileInfo.module.css'
import user from './../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import { ChangeEvent, useState } from 'react'
import ProfileDataForm from './ProfileDataForm'
import { useEffect } from 'react'
import { ProfileType, ContactsType } from '../../../Types/types'

type PropsType = {
  isEdit: boolean
  profile: ProfileType | null
  savePhoto: (file: File) => void
  isOwner: boolean
  updateUserStatus: (status: string) => void
  editMode: (mode: boolean) => void
  status: string
  saveProfile: (profile: ProfileType, setStatus: any) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {
  useEffect(() => {}, [props.isEdit])

  if (!props.profile) {
    return <Preloader />
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  return (
    <section>
      <div>
        <img src="https://www.newcastle.edu.au/__data/assets/image/0007/262933/b_information_technology_header.jpg" />
      </div>
      <img className={s.userImg} src={props.profile.photos.large || user} />
      {props.isOwner && (
        <div>
          <input type={'file'} onChange={onMainPhotoSelected} />
        </div>
      )}

      {props.isEdit ? (
        <ProfileDataForm
          profile={props.profile}
          editMode={props.editMode}
          saveProfile={props.saveProfile}
        />
      ) : (
        <ProfileData
          editMode={props.editMode}
          saveProfile={props.saveProfile}
          profile={props.profile}
          isOwner={props.isOwner}
        />
      )}
      <ProfileStatus
        status={props.status}
        updateUserStatus={props.updateUserStatus}
      />
    </section>
  )
}
type PropsProfileDataType = {
  isOwner: boolean
  editMode: (mode: boolean) => void
  profile: ProfileType

  saveProfile: (profile: ProfileType, setStatus: any) => void
}

const ProfileData: React.FC<PropsProfileDataType> = (props) => {
  return (
    <div className={s.descriptionBlock}>
      {props.isOwner && (
        <div>
          <button
            onClick={() => {
              props.editMode(true)
            }}
          >
            Edit
          </button>
        </div>
      )}

      <div>
        <b>Full name</b>: {props.profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My professional skills</b>:{' '}
          {props.profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>

      <li className={s.profileList}>
        <b>Contacts</b>:
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key as keyof ContactsType]}
            />
          ) //[key]
        })}
      </li>
    </div>
  )
}

type PropsContactType = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<PropsContactType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <ul>
      {contactTitle}: {contactValue || '-'}
    </ul>
  )
}

export default ProfileInfo
