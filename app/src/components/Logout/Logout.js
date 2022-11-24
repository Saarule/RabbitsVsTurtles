import { useWeb3React } from "@web3-react/core";
import React from "react";

import "./logout.css";
import logoutImgLight from "../../assets/pic/logout-light.png";
import logoutImgDark from "../../assets/pic/logout-dark.png";

const Logout = ({ isDarkMode, setIsLogout }) => {
  const { connector, accounts } = useWeb3React();

  async function disconnect() {
    if (connector?.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
  }

  return (
    <div className="logout" style={
        isDarkMode
          ? {
              background:
                "linear-gradient(225.23deg, #0F0C29 -3.27%, #0F0C29 -3.26%, #302B63 47.48%, #24243E 103.26%",
              color: "#ffffff",
            }
          : {}
      }
      onClick={(e) => e.stopPropagation()}>
      <div className="logout-img">
        <img alt="" src={isDarkMode ? logoutImgDark : logoutImgLight} />
      </div>
      <div className="logout-account">
        {String(accounts[0]).substring(0, 6) +
          "..." +
          String(accounts[0]).substring(38)}
      </div>
      <div className="logout-txt">
        Oh no! You are leaving... <br />
        Are you sure?
      </div>
      <div className="logout-btn" onClick={()=>setIsLogout(false)}>Naah, Just Kidding</div>
      <div
        className="logout-btn"
        onClick={() => {
          disconnect();
          setIsLogout(false);
        }}
      >
        Yes, Log Me Out
      </div>
    </div>
  );
};

export default Logout;
