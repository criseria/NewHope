import React from 'react'
import './modal.css'
import Text from '../text/Text'
const FixedModal = ({ text, action, secondaryAction, actionLabel, secondaryLabel,
  btn_cls = '', secondary_btn_cls = '' }) => {
  return (
    <div className='fixed__modal-modal-wrap flex'>
      <div className='fixed__modal-modal-bg' onClick={secondaryAction} />
      <div className='fixed__modal-modal flex'>
        <Text text={text} cls={'fixed__modal-modal-txt'} />
        <div className='fixed__modal-modal-btn-wrap'>
          <button className={btn_cls} onClick={action}>{actionLabel}</button>
          <button className={secondary_btn_cls} onClick={secondaryAction} >{secondaryLabel}</button>
        </div>
      </div>
    </div>
  )
}

export default FixedModal
