import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllplayer } from '../../features/playerToShowSlice'
import { useDispatch } from 'react-redux'
import {removePlayer} from '../../features/playerToShowSlice'

import './player-details.css'

const PlayerDetails = () => {
  const dispatch = useDispatch()
  const player = useSelector(selectAllplayer)
  
  const resetPlayer = ()=>{
    dispatch(
      removePlayer({})
    )
  }
  if(!player) return
  return (
    <div className='outside-click' onClick={resetPlayer}>
    <div className='player-details'>
        <div className='player-img'><img alt='' src={player.image}/></div>
        {/* <div className='player-name'>{player.player.name.split('#')[1]}</div> */}
        <div className='player-exit' onClick={resetPlayer}>EXIT</div>
    </div>
    </div>
  )
}

export default PlayerDetails