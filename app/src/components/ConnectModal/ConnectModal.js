import React, { useEffect } from "react";
import { getConnection, getIsCoinbaseWallet } from "../../connectors/utils";

import "./concect-modal.css";

import metamaskIcon from "../../assets/pic/logos_metamask-icon.png";
import coinbaseWalletIcon from "../../assets/pic/coinbase-icon.png";
import walletConnectIcon from "../../assets/pic/walletconnect-icon.png";
import exitIcon from "../../assets/pic/exit-icon.png";

const ConnectModal = ({ setActiveModal, setChosenConnection }) => {
  const connectToWallet = async (connectionName) => {
    setChosenConnection(connectionName);
    const connection = getConnection(connectionName);
    // if (connectionName === "MetaMask") activateInjectedProvider("MetaMask");
    // if (connectionName === "CoinbaseWallet") {
    //   console.log('coinbase');
    //   activateInjectedProvider("CoinbaseWallet");}
    setActiveModal("WaitingToConnect");
    try {
      await connection.connector.connectEagerly(137);
      await connection.connector.activate(137);
    } catch (err) {
      console.log(err);
      try {
        await connection.connector.activate(137);
      } catch (err) {
        console.log(err);
        setActiveModal("FailToConnect");
      }
    // } finally {
    //   if (connectionName === "MetaMask") activateInjectedProvider("MetaMask");
    //   if (connectionName === "CoinbaseWallet") {
    //     console.log("coinbase");
    //     activateInjectedProvider("CoinbaseWallet");
    //   }
    }
  };

  const activateInjectedProvider = (providerName) => {
    const { ethereum } = window;
    if (!ethereum?.providers) {
      return undefined;
    }
    let provider;
    switch (providerName) {
      case "CoinbaseWallet":
        provider = ethereum.providers.find(
          ({ isCoinbaseWallet }) => isCoinbaseWallet
        );
        break;
      case "MetaMask":
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
    }
    if (provider) {
      ethereum.setSelectedProvider(provider);
    }
  };

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
            By connecting a wallet, you agree to Mverse Terms of Service and
            acknowledge that you have read and understand the Mverse Protocol
            Disclaimer.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConnectModal;
