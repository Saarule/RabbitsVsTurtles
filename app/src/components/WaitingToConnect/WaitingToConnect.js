import React from 'react'
import './waiting-to-connect.css'
import exitIcon from "../../assets/pic/exit-icon.png";
import loading from '../../assets/pic/waiting-connect-loader.png'

const WaitingToConnect = ({closeFunction,header,subHeader,orangetxt,footer}) => {
  return (
    <div className='waiting-connect'>
        {closeFunction && <div className='modal-exit' onClick={closeFunction}><img alt='' src={exitIcon}/></div>}
        <div style={{textAlign: 'center'}}>
        {header && <div className='waiting-header'>{header}</div>}
        {subHeader && <div className='waiting-subheader'>{subHeader}</div>}
        </div>
        <div className='lds-ring'><div></div><div></div><div></div></div>
        {/* <div className='waiting-loader'><img alt='' src={loading}/></div> */}
        {orangetxt && <div className='waiting-orange-txt'>{orangetxt}</div>}
        {footer && <div className='waiting-footer'>{footer}</div>}
    </div>
  )
}

export default WaitingToConnect
