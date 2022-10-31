import React from "react";
import { useWeb3React } from "@web3-react/core";

import "./wallet-details.css";
import copyIcon from "../../assets/pic/copy-icon.png";
import exportIcon from "../../assets/pic/export-icon.png";
import logoutIcon from "../../assets/pic/logout-icon.png";
import shevronRightIcon from "../../assets/pic/shevron-right-icon.png";
import darkThemeIcon from "../../assets/pic/dark-theme-icon.png";

const WalletDetails = ({account,balance}) => {
  const {connector} = useWeb3React()

  async function disconnect() {
    if (connector?.deactivate) {
      connector.deactivate()
      console.log('de');
    } else {
      console.log('hi');
      connector.resetState()
    }
}
  return (
    <div className="wallet-details" onClick={e => e.stopPropagation()}>
      <div className="wallet-header">
        <div className="header-profile">
          <div className="profile-pic">
            <img alt="" src="" />
          </div>
          {account? <div>
          {String(account).substring(0, 6) +
            "..." +
            String(account).substring(38)}
        </div>: <div>Guest</div>}
        </div>
        <div className="wallet-details-icons">
          <div className="wallet-diconnect">
            <img alt="" src={copyIcon} />
          </div>
          <div className="wallet-transactions">
            <img alt="" src={exportIcon} />
          </div>
          <div className="wallet-copy" onClick={disconnect}>
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
