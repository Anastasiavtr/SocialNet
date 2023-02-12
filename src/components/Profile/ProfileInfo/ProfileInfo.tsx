import Preloader from '../../Preloader/Preloader'
import styles from './ProfileInfo.module.css'
import user from './../../../assets/images/user.png'
import ProfileStatus from './ProfileStatus'
import { ChangeEvent } from 'react'
import ProfileDataForm from './ProfileDataForm'
import { useEffect } from 'react'
import { ProfileType, ContactsType } from '../../../Types/types'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import React from 'react'

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

const ProfileInfo: React.FC<PropsType> = React.memo((props) => {
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
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <img
            className={styles.userImg}
            src={props.profile.photos.large || user}
          />
          {props.isOwner && (
            <div className={styles.input}>
              <input type={'file'} onChange={onMainPhotoSelected} />
            </div>
          )}
        </div>
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
      </div>
    </section>
  )
})

type PropsProfileDataType = {
  isOwner: boolean
  editMode: (mode: boolean) => void
  profile: ProfileType

  saveProfile: (profile: ProfileType, setStatus: any) => void
}

const ProfileData: React.FC<PropsProfileDataType> = React.memo((props) => {
  return (
    <div className={styles.descriptionBlock}>
      {props.isOwner && (
        <div className={styles.button}>
          <button
            onClick={() => {
              props.editMode(true)
            }}
          >
            Edit
          </button>
        </div>
      )}

      <div className={styles.descriptionItems}>
        <div className={styles.items}>
          <AutoAwesomeIcon /> <b>Full name:</b> {props.profile.fullName}
        </div>
        <div className={styles.items}>
          <AutoAwesomeIcon /> <b>Looking for a job:</b>{' '}
          {props.profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {props.profile.lookingForAJob && (
          <div className={styles.items}>
            <AutoAwesomeIcon />
            <b>My professional skills:</b>{' '}
            {props.profile.lookingForAJobDescription}
          </div>
        )}

        <div className={styles.items}>
          <AutoAwesomeIcon />
          <b>About me:</b> {props.profile.aboutMe}
        </div>
      </div>

      <li className={styles.profileList}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key as keyof ContactsType]}
            />
          )
        })}
      </li>
    </div>
  )
})
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
