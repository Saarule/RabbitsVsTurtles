import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./header2.css";
import lighting from "../../assets/pic/btn-lighting.png";
import heart from "../../assets/pic/btn-heart.png";
import swords from "../../assets/pic/btn-swords.png";
import flags from "../../assets/pic/btn-flags.png";
import logo from "../../assets/pic/game-logo.png";
import account from "../../assets/pic/header-account.png";
import accountGuest from "../../assets/pic/header-account-guest.png";
import WalletDetails from "../WalletDetails/WalletDetails";
import NetworksModal from "../NetworksModal/NetworksModal";
import Logout from "../Logout/Logout";

const Header = ({ setActivePage, info, setActiveModal, isDarkMode, setIsDarkMode }) => {
  const [isWalletDetails, setIsWalletDetails] = useState(false);
  const [balance, setBalance] = useState("");
  const { accounts } = useWeb3React();
  const [isLogout, setIsLogout] = useState(false);

  const getUserBalance = async () => {
    const balance = await info.web3.eth.getBalance(accounts[0]);
    setBalance(Number(info.web3.utils.fromWei(balance)).toFixed(2));
  };

  useEffect(() => {
    setBalance('')
    if(accounts?.length !== 0){
      // setIsWalletDetails(false)
      console.log(accounts?.length !== 0, accounts);
      getUserBalance();
    } 
  }, [accounts]);

  return (
    <div className="header">
      <div className="header-links">
        <img alt="" src={lighting} onClick={() => setActivePage("mint")} />
        <img alt="" src={heart} onClick={() => setActivePage("graveyard")} />
        <img alt="" src={swords} onClick={() => setActivePage("arena")} />
        <img alt="" src={flags} onClick={() => setActivePage("overview")}/>
      </div>
      <div className="header-logo" onClick={() => setActivePage("map")}>
        <img alt="" src={logo} style={{ height: "100%" }} />
      </div>
      <div className="header-account">
        <div className="header-account-container" onClick={accounts?.length?() => setIsWalletDetails(!isWalletDetails):()=>setActiveModal('connectModal')}>
        <img alt="" src={accounts?.length? account : accountGuest} />
        <div style={!accounts?.length? {color: 'white'}: {}}>{accounts?.length? String(accounts[0]).substring(0, 6) +
            "..." +
            String(accounts[0]).substring(38): `Connect Wallet`}</div>
      </div>
        </div>
      {isWalletDetails &&
        <div className="outside-click" onClick={() => setIsWalletDetails(false)}>
          <WalletDetails balance={balance} setIsWalletDetails={setIsWalletDetails} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsLogout={setIsLogout}/>
        </div>
      }
      {/* <NetworksModal isDarkMode={isDarkMode}/> */}
      {isLogout && <div className="outside-click" onClick={() => setIsLogout(false)}>
      <Logout isDarkMode={isDarkMode} setIsLogout={setIsLogout}/>
      </div>
      }
      <div></div>
    </div>
  );
};

export default Header;
