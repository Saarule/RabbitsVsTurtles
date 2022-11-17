import React, { useState } from "react";

import "./footer.css";
import footerBar from "../../assets/pic/footer-bar.png";
import goldFrame from "../../assets/pic/header-account.png";
import NetworksModal from "../NetworksModal/NetworksModal";
import potionBlueBtn from '../../assets/pic/potion-blue-btn.png'
import potionPinkBtn from '../../assets/pic/potion-pink-btn.png'
import shieldDiamondBtn from '../../assets/pic/shield-diamond-btn.png'
import shieldSworddBtn from '../../assets/pic/shield-sword-btn.png'
import emptyBtn from '../../assets/pic/empty-btn.png'
import { Link } from "react-router-dom";

const Footer = ({ setActivePage, isDarkMode }) => {

  const [isNetwork, setIsNetwork] = useState(false)

  return (
    <div className="footer">
      <div className="footer-side">
        <img alt="" src={goldFrame} />
        <div className="side-txt">My Warriors</div>
      </div>
      <div className="footer-center">
        <img alt="" src={goldFrame} />
        <div className="footer-links">
        <Link to="/shop"><img alt="" src={emptyBtn}/></Link>
        <Link to="/shop"><img alt="" src={shieldSworddBtn} /></Link>
        <Link to="/shop"><img alt="" src={shieldDiamondBtn} /></Link>
        <Link to="/shop"><img alt="" src={potionPinkBtn} /></Link>
        <Link to="/shop"><img alt="" src={potionBlueBtn} /></Link>
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
