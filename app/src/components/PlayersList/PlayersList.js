import React from 'react'

import Player from '../Player/Player';
import './player-list.css'
import MintNewPlayer from '../MintNewPlayer/MintNewPlayer'

const PlayersList = ({playersToShow, onClickFunc, filter}) => {
  return (
    <div className="players-list">
      {playersToShow.map((player, idx) => {
        return (
          <Player key={idx} player={player} onClickFunc={()=>onClickFunc(player)} height={'50%'}/>
        );
      })}
      {filter === 'Mine' && <MintNewPlayer height={'56%'} fontSize={'0.65em'}/>}
    </div>
  )
}

export default PlayersList