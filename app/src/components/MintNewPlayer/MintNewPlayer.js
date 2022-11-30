import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import "./mint-new-player.css";
import playerFrame from '../../assets/pic/my-player-frame.png'
import playerNameFrameRed from '../../assets/pic/player-name-frame-red.png'
import playerNameFrameBlue from '../../assets/pic/player-name-frame-blue.png'
import lightingIcon from '../../assets/pic/btn-lighting.png'

const MintNewPlayer = ({height, fontSize}) => {
    
    const[isSwitch, setIsSwitch] = useState(true)
    const intervalId = useRef()

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setIsSwitch((isSwitch) => !isSwitch);
        }, 500);
        return ()=>{
          clearInterval(intervalId.current)
        }
      }, []);

    const getBackground = () => {
        if (isSwitch)
          return {
            background:
              "linear-gradient(132.07deg, #bf4040 0%, #cc6677 35.49%, #bf406a 70.98%)",
          };
        else
          return {
            background:
              "linear-gradient(138.99deg, #0000FF 6.81%, #0000FF 39.7%, #0000FF 72.59%)",
          };
      };

  return (
    <Link to="/mint" className="mint-my-player" style={{height: height}}>
      <div className="my-player-frame">
        <img alt="" src={playerFrame} />
        <div className="empty-background" style={getBackground()} />
        <div className="my-player-name">
          <img alt="" src={isSwitch? playerNameFrameRed : playerNameFrameBlue} />
          <div className="my-player-id">?</div>
        </div>
      </div>
      <div className="mint-new-player" style={{fontSize: fontSize}}>Tap to mint a new warrior!</div>
        <div className="mint-lighting-symbol">
          <img alt="" src={lightingIcon} />
        </div>
    </Link>
  );
};

export default MintNewPlayer;
