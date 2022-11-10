import React from 'react'

import './main-btn.css'
import btnImg from '../../assets/pic/mint-btn.png'

const MainBtn = ({txt, func}) => {
  return (
    <div className='main-btn'>
        <img alt='' src={btnImg} onClick={func}/>
        <div onClick={func}>{txt}</div>
    </div>
  )
}

export default MainBtn