import React from 'react'

import './player-details.css'

const PlayerDetails = ({player, setPlayerToShow}) => {
  return (
    <div className='player-details'>
        <div className='player-img'><img alt='' src={player.image}/></div>
        {/* <div className='player-name'>{player.player.name.split('#')[1]}</div> */}
        <div className='player-exit' onClick={setPlayerToShow(null)}>EXIT</div>
    </div>
  )
}

export default PlayerDetails