import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import "./notification.css";
import exitIcon from "../../assets/pic/exit-icon.png";
import successIcon from "../../assets/pic/success-icon.png";
import failerIcon from "../../assets/pic/failer-icon.png";

const Notification = ({ type, msg, closeFunc}) => {
  const notification = type ? successIcon : failerIcon;
  return (
        <motion.div
          className={`notification`}
          initial={{ scale: 0.1}}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={closeFunc}
        >
          <div className="exit">
            <img alt="" src={exitIcon} />
          </div>
          <div className="indication">
            <img alt="" src={notification} />
          </div>
          <div className="text">{msg}</div>
          <div className="view-in-explorer">View on Explorer</div>
        </motion.div>
  );
};

export default Notification;
