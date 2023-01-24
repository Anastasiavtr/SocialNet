import { ChangeEvent, useEffect } from "react";
import { useState } from "react";
import styles from './../Profile.module.css'

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}
const ProfileStatus:React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false)
    let [status, setUserStatus] = useState(props.status)
    
    useEffect( () => {
        setUserStatus(props.status)
   }, [props.status]) 
   
    const activateEditMode = () => {
        setEditMode(true)
    }
    
    const deactivateEditMode = () => {
        setEditMode(false)
    props.updateUserStatus(status)

    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserStatus(e.currentTarget.value)
    }
    const keyEnter = (e: React.KeyboardEvent<object>) => {
     if (e.key === "Enter") 
        deactivateEditMode()
    }
    
    return (
        
        <div className={styles.statusInput}>
            {!editMode ? ( 
                <div>
                    <span onDoubleClick={activateEditMode}>{ status || 'No status'}</span>
                </div>
                        ) 
                 :  ( <div>
                    <input type="text" onChange={onStatusChange} autoFocus={true} 
                      onKeyPress={keyEnter} onBlur={deactivateEditMode} value={status || ''} />
                </div>)}
        </div>
    )
 }

export default ProfileStatus