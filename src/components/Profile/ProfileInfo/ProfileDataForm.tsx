import { Formik, Field, Form } from 'formik'
import s from './ProfileInfo.module.css'
import { ProfileSchema } from '../../../Validators/ValidationDialogs'
import { ProfileType } from '../../../Types/types'

type PropsType = {
profile: ProfileType 
saveProfile: (profile: ProfileType, setStatus: any) => void
editMode: (mode:boolean) => void
}

const ProfileDataForm:React.FC<PropsType> = ({profile, saveProfile, editMode}) => { 
  
   return ( <Formik  

   initialValues={profile as ProfileType}

   onSubmit={(values, {setStatus}) =>
    { saveProfile(values, setStatus)}}
   
   validationSchema = {ProfileSchema}>
         

{ ({errors,  handleBlur, status, handleChange }) => (
      <Form >

      <div className={s.inputContainer}>
        <b>Full name:</b> 
       <Field   
       
as={"input"}
name={"fullName"}
placeholder="Enter your name" 
onBlur={handleBlur}
onChange={handleChange} />
{errors.fullName ? (<p>{errors.fullName}</p>) : null}
 </div>
 <div className={s.inputContainer}>

<Field   

 type={"checkbox"} 
name={"lookingForAJob"}
onBlur={handleBlur}
onChange={handleChange}
 id={'yesOrNo'}/>
<label htmlFor={'yesOrNo'}><b>Looking for a job?</b></label>
</div>

 <div className={s.inputContainer}>
<b>Your skills:</b>
<Field   
as={"textarea"}
name={"lookingForAJobDescription"}
placeholder="Enter your skills" 
onBlur={handleBlur}
onChange={handleChange} />
{errors.lookingForAJobDescription && <p>{errors.lookingForAJobDescription}</p>}
</div>

<div className={s.inputContainer}>
   <b>About me:</b>
<Field   
as={"textarea"}
name={"aboutMe"}
placeholder="About me" 
onBlur={handleBlur}
onChange={handleChange} />
{errors.aboutMe && <p>{errors.aboutMe}</p>}
</div>
   

<div className={s.inputContainer}>
       <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
    return <div key={key} className={s.inputContainer}>        
       <b>{key}</b>
       <Field type={"input"}name={"contacts." + key } placeholder={key} onChange={handleChange} />     
      </div>
 })}

</div>

   
<div className={s.inputContainer}><p>{status}</p></div>
  <div> <button type={"submit"} >Save</button></div>
         </Form>
       )
   }    
        </Formik>
  )}

export default ProfileDataForm





