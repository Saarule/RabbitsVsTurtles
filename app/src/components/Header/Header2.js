import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./header2.css";
import lighting from "../../assets/pic/btn-lighting.png";
import heart from "../../assets/pic/btn-heart.png";
import swords from "../../assets/pic/btn-swords.png";
import flags from "../../assets/pic/btn-flags.png";
import logo from "../../assets/pic/game-logo.png";
import account from "../../assets/pic/header-account.png";
import WalletDetails from "../WalletDetails/WalletDetails";

const Header = ({ setActivePage, info }) => {
  const [isWalletDetails, setIsWalletDetails] = useState(false);
  const [balance, setBalance] = useState("");
  const { accounts } = useWeb3React();

  const getUserBalance = async () => {
    const balance = await info.web3.eth.getBalance(accounts[0]);
    setBalance(Number(info.web3.utils.fromWei(balance)).toFixed(2));
  };

  useEffect(() => {
    getUserBalance();
  }, []);

  return (
    <div className="header">
      <div className="header-links">
        <img alt="" src={lighting} onClick={() => setActivePage("mint")} />
        <img alt="" src={heart} onClick={() => setActivePage("shop")} />
        <img alt="" src={swords} onClick={() => setActivePage("arena")} />
        <img alt="" src={flags} onClick={() => setActivePage("overview")}/>
      </div>
      <div className="header-logo" onClick={() => setActivePage("map")}>
        <img alt="" src={logo} style={{ height: "100%" }} />
      </div>
      <div className="header-account">
        <img alt="" src={account} onClick={() => setIsWalletDetails(!isWalletDetails)} />
      </div>
      {isWalletDetails &&
        <div className="outside-click" onClick={() => setIsWalletDetails(false)}>
          <WalletDetails balance={balance} account={accounts[0]} />
        </div>
      }
      <div></div>
    </div>
  );
};

export default Header;
