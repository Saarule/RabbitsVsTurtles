import React from "react";

import './network-modal.css'
import polygonIcon from "../../assets/pic/polygon-symbol.png";

const NetworksModal = () => {
  return (
    <div className="network-modal">
      <div className="network-modal-name">
        <div><img alt="" src={polygonIcon}/></div>
        <div>Polygon</div>
        <div className="network-active"><img alt="" src={polygonIcon}/></div>
      </div>
      <div className="network-modal-name">
        <div><img alt="" src={polygonIcon}/></div>
        <div>Polygon</div>
        <div><img alt="" src=""/></div>
      </div>
      <div className="network-modal-name">
        <div><img alt="" src={polygonIcon}/></div>
        <div>Polygon</div>
        <div><img alt="" src=""/></div>
      </div>
    </div>
  );
};

export default NetworksModal;
