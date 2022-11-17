import React from "react";

import "./back-btn.css";
import backBtnImg from '../../assets/pic/back-btn.png'

const BackBtn = ({ txt, func }) => {
  return (
    <div className="back-btn">
      <img alt="" src={backBtnImg} onClick={func} />
      <div onClick={func}>{txt}</div>
    </div>
  );
};

export default BackBtn;
