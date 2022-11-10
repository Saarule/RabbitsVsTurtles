import React from 'react'

import './error-modal.css'
import errorImg from '../../assets/pic/error-icon.png'
import exitIcon from '../../assets/pic/exit-icon.png'

const ErrorModal = ({func, error}) => {
  return (
    <div className='error-modal'>
        <div className='error-exit' onClick={func}><img alt='' src={exitIcon}/></div>
        <div className='error-header'>Error</div>
        <div className='error-img'><img alt='' src={errorImg}/></div>
        <div className='error-msg'>Transaction Failed</div>
        <div className='error-reason'>{error}</div>
        <div className='error-btn' onClick={func}>Dismiss</div>
    </div>
  )
}

export default ErrorModal