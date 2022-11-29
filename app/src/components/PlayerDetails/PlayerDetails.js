import React from "react";
import { useSelector } from "react-redux";
import { selectAllplayer } from "../../features/playerToShowSlice";
import { useDispatch } from "react-redux";
import { removePlayer } from "../../features/playerToShowSlice";

import "./player-details.css";

const PlayerDetails = () => {
  const dispatch = useDispatch();
  const player = useSelector(selectAllplayer);

  const resetPlayer = () => {
    dispatch(removePlayer({}));
  };

  const getHeaderBackground = ()=>{
    if(!player.player.alive){
      return {background: 'linear-gradient(90deg, rgb(164, 166, 166), rgb(120, 120, 120))'}
    }else if(player.player.playerType === 'Turtle'){
      return {background: 'linear-gradient(90deg, rgb(245, 77, 51), rgb(186, 52, 32))'}
    }else{
      return {background: 'linear-gradient(90deg, rgb(0, 161, 247), rgb(0, 88, 204))'}
    }
  }
  const getFrameBackground = ()=>{
    if(!player.player.alive){
      return {background: 'rgb(184, 186, 186)'}
    }else if(player.player.playerType === 'Turtle'){
      return {background: 'rgb(235, 68, 68)'}
    }else{
      return {background: 'rgb(1, 132, 249)'}
    }
  }
  const getExitBackground = ()=>{
    if(!player.player.alive){
      return {background: 'linear-gradient(#a4a6a6,#787878)'}
    }else if(player.player.playerType === 'Turtle'){
      return {background: 'linear-gradient(#f54d33,#ba3420)'}
    }else{
      return {background: 'linear-gradient(#00a1f7,#0058cc)'}
    }
  }



  if (!player) return;
  return (
    <div className="outside-click" onClick={resetPlayer}>
      <div className="player-container" style={getFrameBackground()}>
        <div className="player-details">
          <div className="player-details-name" style={getHeaderBackground()}>
            {`${player.player.playerType} #${player.id}`}
          </div>
          <div className="player-img">
            <img alt="" src={player.image} />
          </div>
          {/* <div className='player-name'>{player.player.name.split('#')[1]}</div> */}
          <div className="player-details-exit" onClick={resetPlayer} style={getExitBackground()}>
            EXIT
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;
