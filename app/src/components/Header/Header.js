import React, { useEffect } from "react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import WalletDetails from "../WalletDetails/WalletDetails";
import NetworksModal from "../NetworksModal/NetworksModal";

import "./header.css";
import polygonIcon from "../../assets/pic/polygon-symbol.png";
import shevronDown from "../../assets/pic/shevron-down.png";
import moreOptions from "../../assets/pic/three-dots.png";

const Header = () => {
  const {
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ENSNames,
    connector,
  } = useWeb3React();

  const [activeModal, setActiveModal] = useState("");
  const [balance, setBalance] = useState("");

  
  const getUserBalance = async () => {
    const web3 = new Web3('https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d');
    const balance = await web3.eth.getBalance(accounts[0]);
    setBalance(Number(web3.utils.fromWei(balance)).toFixed(2))
  };

  useEffect(() => {
    getUserBalance()
  }, []);

  const changeModal = (modalName) => {
    switch (modalName) {
      case "WalletDetails":
        setActiveModal("WalletDetails");
        break;
      case "NetworksModal":
        setActiveModal("NetworksModal");
        break;
      case "WaitingToConnect":
        setActiveModal("WaitingToConnect");
        break;
      case "FailToConnect":
        setActiveModal("FailToConnect");
        break;
      default:
        setActiveModal("");
    }
  };

  if(!isActive) return
  return (
    <div className="main-header">
      <div className="more-options hover">
        <img alt="" src={moreOptions} />
      </div>
      <div className="user hover" onClick={() => changeModal("WalletDetails")}>
        {accounts[0]? <div>
          {String(accounts[0]).substring(0, 6) +
            "..." +
            String(accounts[0]).substring(38)}
        </div>: <div>Guest</div>}
        <div className="profile-pic"></div>
      </div>
      <div className="balance hover">
        <div>{balance+' '}</div>
        <div>MATIC</div>
      </div>
      <div className="network hover" onClick={() => changeModal("NetworksModal")}>
        <div className="network-symbol">
          <img alt="" src={polygonIcon} />
        </div>
        <div className="network-name">Polygon</div>
        <div className="">
          <img alt="" src={shevronDown} />
        </div>
      </div>
      {activeModal === "WalletDetails" && (
        <div className="outside-click" onClick={() => changeModal("")}>
          <div></div>
          <WalletDetails account={accounts[0]} balance={balance}/>
        </div>
      )}
      {activeModal === "NetworksModal" && (
        <div className="outside-click" onClick={() => changeModal("")}>
          <div></div>
          <NetworksModal/>
        </div>
      )}
    </div>
  );
};

export default Header;
