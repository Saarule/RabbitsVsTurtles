import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

import './map.css'


const Map = ({isAudio}) => {
  
  const audio = new Audio(require('../../assets/music/Slayer-Overview.mp3'))
  audio.loop = true

  useEffect(()=>{
    if(isAudio) audio.play()
    else{
      audio.pause()
      audio.currentTime = 0;
    }
    return ()=>{
      audio.pause()
      audio.currentTime = 0;
    }
  },[isAudio])

  return (
    <div className='map'>
       
    </div>
  )
}

export default Map