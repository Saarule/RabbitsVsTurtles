import React, { useState } from "react";

import "./footer.css";
import footerBar from "../../assets/pic/footer-bar.png";
import goldFrame from "../../assets/pic/header-account.png";
import NetworksModal from "../NetworksModal/NetworksModal";
import potionBlueBtn from "../../assets/pic/potion-blue-btn.png";
import potionPinkBtn from "../../assets/pic/potion-pink-btn.png";
import shieldDiamondBtn from "../../assets/pic/shield-diamond-btn.png";
import shieldSworddBtn from "../../assets/pic/shield-sword-btn.png";
import emptyBtn from "../../assets/pic/empty-btn.png";
import { Link } from "react-router-dom";
import { store } from "../../features/store";
import { updatePlayer } from "../../features/playersSlice";
import { useSelector } from "react-redux";
import { selectAllInfo } from "../../features/infoSlice";
import MyPlayers from "../MyPlayers/MyPlayers";
import muteBtn from "../../assets/pic/sound-mute.png";
import unmuteBtn from "../../assets/pic/sound-unmute.png";

const Footer = ({ isDarkMode }) => {
  const [isNetwork, setIsNetwork] = useState(false);
  const [isMyWarriors, setIsMyWarriors] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const info = useSelector(selectAllInfo);

  const updateNewPlayer = () => {
    store.dispatch(updatePlayer({ contract: info.contract, playerId: 90 }));
  };

  return (
    <div className="footer">
      <div className="footer-side">
        <div className="footer-sound" onClick={() => setIsMute(!isMute)}>
          <img alt="" src={isMute ? muteBtn : unmuteBtn} />
        </div>
        <div
          className="footer-my-warriors"
          onClick={() => setIsMyWarriors(true)}
        >
          <img alt="" src={goldFrame} />
          <div className="side-txt">My Warriors</div>
        </div>
      </div>
      <div className="footer-center">
        <img alt="" src={goldFrame} />
        <div className="footer-links">
          <Link to="/shop">
            <img alt="" src={emptyBtn} />
          </Link>
          <Link to="/shop">
            <img alt="" src={shieldSworddBtn} />
          </Link>
          <Link to="/shop">
            <img alt="" src={shieldDiamondBtn} />
          </Link>
          <Link to="/shop">
            <img alt="" src={potionPinkBtn} />
          </Link>
          <Link to="/shop">
            <img alt="" src={potionBlueBtn} />
          </Link>
        </div>
      </div>
      <div className="footer-side right" onClick={() => setIsNetwork(true)}>
        <div className="footer-network">
          <img alt="" src={goldFrame} />
          <div className="side-txt">Polygon</div>
        </div>
      </div>
      {isNetwork && (
        <div className="outside-click" onClick={() => setIsNetwork(false)}>
          <NetworksModal
            isDarkMode={isDarkMode}
            closeFunc={() => setIsNetwork(false)}
          />
        </div>
      )}
      {isMyWarriors && (
        <div className="outside-click" onClick={() => setIsMyWarriors(false)}>
          <MyPlayers
            isDarkMode={isDarkMode}
            closeFunc={() => setIsMyWarriors(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Footer;
