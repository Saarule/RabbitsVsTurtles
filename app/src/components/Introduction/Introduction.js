import React from 'react'

import './introduction.css'
import btnIcon from '../../assets/pic/mint-btn.png'

const Introduction = ({txt,header,btnTxt}) => {
  return (
    <div className='introduction'>
        {/* <img className='introduction-backgroun' alt='' src={frame}/> */}
        <div className='frame-header'>{header}</div>
        <div className='frame-txt'>{txt}</div>
        <div className='frame-btn'>
          <div>{btnTxt}</div>
          <img alt='' src={btnIcon}/>
          </div>
    </div>
  )
}

export default Introduction