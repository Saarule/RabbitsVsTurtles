import React, { useEffect } from "react";
import { getConnection, getIsCoinbaseWallet } from "../../connectors/utils";

import "./concect-modal.css";

import metamaskIcon from "../../assets/pic/logos_metamask-icon.png";
import coinbaseWalletIcon from "../../assets/pic/coinbase-icon.png";
import walletConnectIcon from "../../assets/pic/walletconnect-icon.png";
import exitIcon from "../../assets/pic/exit-icon.png";
import { Connect } from "../../services/connect.wallet.service";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { updateConnector } from "../../features/connectorSlice";

const ConnectModal = ({ setActiveModal, setChosenConnection }) => {
  const {chainId} = useWeb3React()
  const dispatch = useDispatch()

  const connectToWallet = async (connectionName) => {
    dispatch(updateConnector(connectionName))
    setChosenConnection(connectionName);
    setActiveModal("waitingToConnect");
    const res = await Connect(connectionName, chainId)
    if(res) setActiveModal("failToConnect");
  }

  return (
    <div className="modal-container">
      <div className="modal-header">
        <div className="connect-exit" onClick={() => setActiveModal("welcome")}>
          <img alt="" src={exitIcon} />
        </div>
        <div className="modal-title">Connect a wallet</div>
      </div>
      <div className="modal-content">
        <div
          className="modal-link"
          onClick={() => {
            connectToWallet("MetaMask");
          }}
        >
          <div className="modal-link-txt">Metamask</div>
          <div className="modal-link-img"><img alt="" src={metamaskIcon} /></div>
        </div>
        <div
          className="modal-link"
          onClick={() => {
            connectToWallet("CoinbaseWallet");
          }}
        >
          <div className="modal-link-txt">Coinbase Wallet</div>
          <div className="modal-link-img"><img alt="" src={coinbaseWalletIcon} /></div>
        </div>
        <div
          className="modal-link"
          onClick={() => {
            connectToWallet("WalletConnect");
          }}
        >
          <div className="modal-link-txt">WalletConnect</div>
          <div className="modal-link-img"><img alt="" src={walletConnectIcon} /></div>
        </div>
        {/* <div
      className="modal_link"
        onClick={() => {
            activate(connectors.fortmatic);
            setProvider("formatic");
        }}
        >
         <div className="modal_link_txt">Formatic</div>
      </div> */}
        <div className="modal-link-footer">
          <span>
            By connecting a wallet, you agree to RVT Terms of Service and
            acknowledge that you have read and understand the RVT Protocol
            Disclaimer.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
