import React from 'react'
import { useState } from 'react'

import './map.css'
import Notification from '../../components/Notification/Notification'

const Map = ({setActivePage}) => {
  const [notification,setNotification] = useState({open: false, msg: '', type: false})
  
  const msg = 'You bought Defense poition succesfully.'

 
  // const sendNotification = () =>{}

  return (
    <div className='map'>
        {notification.open && <Notification msg={msg} type={true}/>}
        {/* <div className='move-to-mint' onClick={()=>setActivePage('mint')}>Mint</div> */}
    </div>
  )
}

export default Map