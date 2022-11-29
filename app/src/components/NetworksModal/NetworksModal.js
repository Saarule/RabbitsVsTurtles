import React from "react";
import { CHAINS } from "../../connectors/chains";

import "./network-modal.css";
import polygonIcon from "../../assets/pic/polygon-symbol.png";
import etheriumIcon from "../../assets/pic/etherium-icon.png";
import optimismIcon from "../../assets/pic/optimism-icon.png";
import arbitrumIcon from "../../assets/pic/arbitrum-icon.png";
import celoIcon from "../../assets/pic/celo-icon.png";
import gorliIcon from "../../assets/pic/gorli-icon.png";
import { useWeb3React } from "@web3-react/core";
import { toast } from "react-toastify";

const NetworksModal = ({ isDarkMode, closeFunc }) => {
  const { chainId, connector, error } = useWeb3React();
  
  const changeNetwork = async (newChainId) => {
    try{
      connector.activate(newChainId)
    }catch(err){
      console.log(err);
      console.log(error);
      toast.info(err.message)
    }
  }

  return (
    <div
      className="network-modal"
      style={
        isDarkMode
          ? {
              background:
                "linear-gradient(225.23deg, #0F0C29 -3.27%, #0F0C29 -3.26%, #302B63 47.48%, #24243E 103.26%",
              color: "#ffffff",
            }
          : {}
      }
      onClick={(e)=>e.stopPropagation()}
    >
      <div className="exit-icon" onClick={closeFunc}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 2.51786L22.4821 0L12.5 9.98214L2.51786 0L0 2.51786L9.98214 12.5L0 22.4821L2.51786 25L12.5 15.0179L22.4821 25L25 22.4821L15.0179 12.5L25 2.51786Z"
            fill={isDarkMode ? "white" : "black"}
          />
        </svg>
      </div>
      <div className="network-modal-name">
        <div className="network-icon">
          <img alt="" src={etheriumIcon} />
        </div>
        <div>Ethereum</div>
        <div className="network-active">
          {chainId === 1 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="network-modal-name" onClick={()=>changeNetwork(137)}>
        <div className="network-icon">
          <img alt="" src={polygonIcon} />
        </div>
        <div>Polygon</div>
        <div className="network-active">
          {chainId === 137 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="network-modal-name">
        <div className="network-icon">
          <img alt="" src={optimismIcon} />
        </div>
        <div>Optimism</div>
        <div className="network-active">
          {chainId === 10 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="network-modal-name">
        <div className="network-icon">
          <img alt="" src={arbitrumIcon} />
        </div>
        <div>Arbitrum</div>
        <div className="network-active">
          {chainId === 42161 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="network-modal-name">
        <div className="network-icon">
          <img alt="" src={celoIcon} />
        </div>
        <div>Celo</div>
        <div className="network-active">
          {chainId === 0 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
      <div className="network-modal-name" onClick={()=>changeNetwork(5)}>
        <div className="network-icon">
          <img alt="" src={gorliIcon} />
        </div>
        <div>Goerli</div>
        <div className="network-active">
          {chainId === 5 && (
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8889 21.7778L3.11111 14L5.30444 11.7911L10.8889 17.3756L22.6956 5.56889L24.8889 7.77778M24.8889 0H3.11111C1.38444 0 0 1.38444 0 3.11111V24.8889C0 25.714 0.327777 26.5053 0.911223 27.0888C1.49467 27.6722 2.28599 28 3.11111 28H24.8889C25.714 28 26.5053 27.6722 27.0888 27.0888C27.6722 26.5053 28 25.714 28 24.8889V3.11111C28 1.38444 26.6 0 24.8889 0Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default NetworksModal;
