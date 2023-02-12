import s from './../Dialogs.module.css'

const Message = (props) => {
  return (
    <div className={s.messageItems}>
      <div className={s.messageImage}>
        <img src="https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-avatar-icon-png-image_4162757.jpg" />
      </div>
      <span className={s.dialog}>{props.message}</span>
    </div>
  )
}

//  className={s.dialog + ' ' + s.active}

export default Message
