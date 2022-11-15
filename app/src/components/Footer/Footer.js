import React, { useState } from "react";

import "./footer.css";
import footerBar from "../../assets/pic/footer-bar.png";
import goldFrame from "../../assets/pic/header-account.png";
import NetworksModal from "../NetworksModal/NetworksModal";
import potionGreenBtn from '../../assets/pic/potion-pink-btn.png'
import potionPinkBtn from '../../assets/pic/potion-pink-btn.png'
import shieldDiamondBtn from '../../assets/pic/shield-diamond-btn.png'
import shieldSworddBtn from '../../assets/pic/shield-sword-btn.png'

const Footer = ({ setActivePage, isDarkMode }) => {

  const [isNetwork, setIsNetwork] = useState(false)

  return (
    <div className="footer">
      <div className="footer-side">
        <img alt="" src={goldFrame} />
        <div className="side-txt">My Worriors</div>
      </div>
      <div className="footer-center">
        <img alt="" src={goldFrame} />
        <div className="footer-links">
        <img alt="" src={potionGreenBtn} onClick={()=>setActivePage('shop')}/>
        <img alt="" src={potionPinkBtn} />
        <img alt="" src={shieldDiamondBtn} />
        <img alt="" src={shieldSworddBtn} />
        </div>
      </div>
      <div className="footer-side" onClick={()=>setIsNetwork(true)}>
        <img alt="" src={goldFrame} />
        <div className="side-txt">Polygon</div>
      </div>
    {isNetwork && <div className="outside-click" onClick={() => setIsNetwork(false)}>
    <NetworksModal isDarkMode={isDarkMode} closeFunc={() => setIsNetwork(false)}/>
    </div>}
    </div>
  );
};

export default Footer;
