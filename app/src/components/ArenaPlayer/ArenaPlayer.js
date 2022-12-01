import React from "react";

import "./arena-player.css";
import headerFrame from "../../assets/pic/header-frame.png";
import mintRockRed from "../../assets/pic/mint-rock-red.png";
import mintRockBlue from "../../assets/pic/mint-rock-blue.png";
import sheildRight from "../../assets/pic/shield-right.png";
import swordRight from "../../assets/pic/sword-right.png";
import sheildLeft from "../../assets/pic/shield-left.png";
import swordLeft from "../../assets/pic/sword-left.png";

const ArenaPlayer = ({ player, type, attacker, func }) => {
  const getMintDataBackground = () => {
    if(player && !player.player.alive) return {
      background:
      "gray",
    }
    if (type === "Turtle")
      return {
        background:
          "linear-gradient(132.07deg, #bf4040 0%, #cc6677 35.49%, #bf406a 70.98%)",
      };
    else if(type === "Rabbit")
      return {
        background:
          "linear-gradient(138.99deg, #0000FF 6.81%, #0000FF 39.7%, #0000FF 72.59%)",
      };
    else return {}
  };

  const getImg = () => {
    if (type === "Turtle") {
      if (attacker) return swordLeft;
      else return sheildLeft;
    } else {
      if (attacker) return swordRight;
      else return sheildRight;
    }
  };

  return (
    <div className="arena-player">
      <div className="arena-position-img" style={type === "Turtle"?{left: '81%'}:{right: '81%'}}>
        <img alt="" src={getImg()} />
      </div>
      <div className="player-position">
        <img alt="" src={headerFrame} />
        <div className="arena-position-header">{attacker? 'ATTCKER' : 'VICTIM'}</div>
        <div></div>
      </div>
      <div className="arena-player-img" style={getMintDataBackground()} onClick={func}>
        {player && <img alt="" src={player.image} />}
        {!player && <div>{`Tap to choose ${type} for the attack`}</div>}
      </div>
      <div className="arena-rock">
        <img alt="" src={type === "Turtle" ? mintRockRed : mintRockBlue} />
      </div>
    </div>
  );
};

export default ArenaPlayer;
