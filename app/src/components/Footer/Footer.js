import React, { useState } from "react";

import "./footer.css";
import footerBar from "../../assets/pic/footer-bar.png";
import goldFrame from "../../assets/pic/header-account.png";
import NetworksModal from "../NetworksModal/NetworksModal";

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
