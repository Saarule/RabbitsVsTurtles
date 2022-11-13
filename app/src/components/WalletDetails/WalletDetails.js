import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./wallet-details.css";
import copyIcon from "../../assets/pic/copy-icon.png";
import exportIcon from "../../assets/pic/export-icon.png";
import logoutIcon from "../../assets/pic/logout-icon.png";
import shevronRightIcon from "../../assets/pic/shevron-right-icon.png";
import darkThemeIcon from "../../assets/pic/dark-theme-icon.png";

const WalletDetails = ({balance}) => {
  const {connector, accounts} = useWeb3React()
  const [isCopy, setIsCopy] = useState(false)

  async function disconnect() {
    if (connector?.deactivate) {
      connector.deactivate()
      console.log('de');
    } else {
      console.log('hi');
      connector.resetState()
    }
}

async function copyTextToClipboard() {
  if(!accounts.length) return
  setIsCopy(true)
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(accounts[0]);
  } else {
    return document.execCommand('copy', true, accounts[0]);
  }
}
  
  console.log(isCopy);
  return (
    <div className="wallet-details" onClick={e => e.stopPropagation()}>
      <div className="wallet-header">
        <div className="header-profile">
          <div className="profile-pic">
            <img alt="" src="" />
          </div>
          {accounts? <div>
          {String(accounts[0]).substring(0, 6) +
            "..." +
            String(accounts[0]).substring(38)}
        </div>: <div>Guest</div>}
        </div>
        <div className="wallet-details-icons">
          <div className="wallet-diconnect" onClick={copyTextToClipboard} title={isCopy? 'copied!':'copy'}>
            <img alt="" src={copyIcon} />
          </div>
          <a href={`https://polygonscan.com/address/${accounts?.length?accounts[0]:{}}`} target="_blank" className="wallet-transactions">
            <img alt="" src={exportIcon} />
          </a>
          <div className="wallet-copy" onClick={disconnect} >
            <img alt="" src={logoutIcon} />
          </div>
        </div>
      </div>
      <div className="wallet-details-balance">
        <div className="balance-matic">{`${balance} MATIC`}</div>
        <div className="balance-usd">$0.00 USD</div>
      </div>
      <div className="wallet-details-footer">
        <div className="wallet-details-line"></div>
        <div className="wallet-details-actions">
          <div className="wallet-details-action">Transactions</div>
          <div className="wallet-details-action-icons"><img alt="" src={shevronRightIcon} /></div>
        </div>
        <div className="wallet-details-actions">
          <div className="wallet-details-action">Language</div>
          <div className="wallet-details-action-icons">EN <img alt="" src={shevronRightIcon} /></div>
        </div>
        <div className="wallet-details-actions">
          <div className="wallet-details-action">Dark theme</div>
          <div className="wallet-details-action-icons"><img alt="" src={darkThemeIcon} /></div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
