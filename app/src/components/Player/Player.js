import React from 'react'

import './player.css'

const Player = ({player, onClickFunc, height}) => {
  
  const getStyle = (player) => {
    if (player.player.playerType === "Turtle")
      return {
        background:
          "linear-gradient(96.47deg, #BF4040 0.9%, #CC6677 52.96%, #BF406A 98.8%)",
      };
    else
      return {
        background:
          "linear-gradient(277.43deg,#0055ff 3.63%,#3355ff 38.08%,#1500ff 96.03%)",
      };
  };
  return (
        <div
          key={player.player.name}
          className="player-display"
          onClick={onClickFunc}
          style={{height}}
        >
          <img alt="" src={player.image} />
          <div
            className="player-display-name"
            style={getStyle(player)}
          >{`#${player.player.name.split("#")[1]}`}</div>
        </div>
      )
}

export default Player