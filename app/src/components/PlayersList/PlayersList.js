import React from 'react'

import Player from '../Player/Player';
import './player-list.css'

const PlayersList = ({playersToShow, onClickFunc}) => {
  return (
    <div className="players-list">
      {playersToShow.map((player, idx) => {
        return (
          <Player key={idx} player={player} onClickFunc={()=>onClickFunc(idx)} height={'50%'}/>
        );
      })}
    </div>
  )
}

export default PlayersList