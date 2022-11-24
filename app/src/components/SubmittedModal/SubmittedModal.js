import React from "react";

import "./submittedModal.css";
import exitIcon from '../../assets/pic/exit-icon.png'
import submittedIcon from '../../assets/pic/submitted-icon.png'

const SubmittedModal = ({func, txHash}) => {
  return (
    <div className="submitted-modal">
      <div className="submitted-exit" onClick={func}>
        <img alt="" src={exitIcon} />
      </div>
      <div className="submitted-icon" >
        <img alt="" src={submittedIcon} />
      </div>
      <div className="submitted-header">Transaction submitted</div>
        <div className="submitted-btn" onClick={func}>Close</div>
        <a href={`https://polygonscan.com/tx/${txHash.hash}`} target="_blank" className="view-on-website">View on Polygonscan</a>
    </div>
  );
};

export default SubmittedModal;
