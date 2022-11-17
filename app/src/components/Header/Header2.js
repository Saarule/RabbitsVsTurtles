import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllInfo } from "../../features/infoSlice";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

const Header = ({setActiveModal, isDarkMode, setIsDarkMode }) => {
  const [isWalletDetails, setIsWalletDetails] = useState(false);
  const [balance, setBalance] = useState("");
  const { accounts } = useWeb3React();
  const [isLogout, setIsLogout] = useState(false);
  const info = useSelector(selectAllInfo) 
  const navigate = useNavigate()

  const getUserBalance = async () => {
    const balance = await info.web3.eth.getBalance(accounts[0]);
    setBalance(Number(info.web3.utils.fromWei(balance)).toFixed(2));
  };

  useEffect(() => {
    setBalance('')
    if(accounts?.length !== 0 && accounts){
      // setIsWalletDetails(false)
      console.log(accounts?.length !== 0, accounts);
      getUserBalance();
    } 
  }, [accounts]);

  return (
    <div className="header">
      <div className="header-links">
        <Link to='/mint'><img alt="" src={lighting}/></Link>
        <Link to='/graveyard'><img alt="" src={heart}/></Link>
        <Link to='/arena'><img alt="" src={swords}/></Link>
        <Link to='/overview'><img alt="" src={flags}/></Link>
      </div>
      <Link to='/map' className="header-logo">
        <img alt="" src={logo} style={{ height: "100%" }} />
      </Link>
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
      {isLogout && <div className="outside-click" onClick={() => setIsLogout(false)}>
      <Logout isDarkMode={isDarkMode} setIsLogout={setIsLogout}/>
      </div>
      }
      <div></div>
    </div>
  );
};

export default Header;
