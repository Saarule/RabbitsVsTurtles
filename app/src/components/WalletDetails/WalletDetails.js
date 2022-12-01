import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";

import "./wallet-details.css";
import darkmodeSun from "../../assets/pic/darkmode-sun.png";
import darkmodeMoon from "../../assets/pic/darkmode-moon.png";
import Transactions from "../Transactions/Transactions";
import leaderboardIcon from '../../assets/pic/leader-board-icon.png'
import muteIcon from '../../assets/pic/sound-mute.png'
import unmuteIcon from '../../assets/pic/sound-unmute.png'
import notificationIcon from '../../assets/pic/notification-icon.png'
import notificationMuteIcon from "../../assets/pic/notification-mute-icon.png";
import openSeaLogo from "../../assets/pic/open-sea-logo.png";
import youtubeLogo from "../../assets/pic/youtube-logo.png";
import twitterLogo from "../../assets/pic/twitter-logo.png";
import reddisLogo from "../../assets/pic/reddis-logo.png";
import discordLogo from "../../assets/pic/discord-logo.png";
import NetworkModal from '../NetworksModal/NetworksModal'
import MyPlayers from '../MyPlayers/MyPlayers'

const WalletDetails = ({balance, setIsWalletDetails, setIsDarkMode, isDarkMode, setIsLogout, setIsAudio, isAudio, setIsEvents, setIsLeaderboard, counter, isNotification }) => {

  const { connector, accounts } = useWeb3React();
  const [isCopy, setIsCopy] = useState(false);
  const [isNetwork, setIsNetwork] = useState(false);
  const [isMyPlayers, setIsMyPlayers] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);


  async function copyTextToClipboard() {
    if (!accounts.length) return;
    setIsCopy(true);
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(accounts[0]);
    } else {
      return document.execCommand("copy", true, accounts[0]);
    }
  }

  console.log(isCopy);
  return (
    <div
      className="wallet-details"
      style={
        isDarkMode
          ? {
              background:
                "linear-gradient(225.23deg, #0F0C29 -3.27%, #0F0C29 -3.26%, #302B63 47.48%, #24243E 103.26%",
              color: "#ffffff",
            }
          : {}
      }
      onClick={(e) => e.stopPropagation()}
    >
      {isTransaction && <Transactions isDarkMode={isDarkMode} setIsTransaction={setIsTransaction}/>}
      <div className="wallet-header">
        <div className="header-profile">
          <div className="profile-pic">
            <img alt="" src="" />
          </div>
          {accounts?.length ? (
            <div>
              {String(accounts[0]).substring(0, 6) +
                "..." +
                String(accounts[0]).substring(38)}
            </div>
          ) : (
            <div>Guest</div>
          )}
        </div>
        <div className="wallet-details-icons">
          <div
            className="wallet-diconnect"
            onClick={copyTextToClipboard}
            title={isCopy ? "copied!" : "copy"}
          >
            <svg
              width="31"
              height="30"
              viewBox="0 0 31 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.4513 21.8182H8.70297V2.72727H27.4513M27.4513 0H8.70297C7.99263 0 7.31139 0.287337 6.8091 0.7988C6.30682 1.31026 6.02463 2.00396 6.02463 2.72727V21.8182C6.02463 22.5415 6.30682 23.2352 6.8091 23.7467C7.31139 24.2581 7.99263 24.5455 8.70297 24.5455H27.4513C28.1616 24.5455 28.8429 24.2581 29.3452 23.7467C29.8475 23.2352 30.1296 22.5415 30.1296 21.8182V2.72727C30.1296 2.00396 29.8475 1.31026 29.3452 0.7988C28.8429 0.287337 28.1616 0 27.4513 0ZM3.3463 5.45455H0.667969V27.2727C0.667969 27.996 0.95015 28.6897 1.45243 29.2012C1.95472 29.7127 2.63596 30 3.3463 30H24.773V27.2727H3.3463V5.45455Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </div>
          <a
            href={`https://polygonscan.com/address/${
              accounts?.length ? accounts[0] : {}
            }`}
            target="_blank"
            className="wallet-transactions"
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 41 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M37.0475 19.8266L35.4369 21.0797C35.3112 21.1776 35.2879 21.3677 35.3857 21.4981L36.8251 23.4163L17.9735 38.0836L3.30502 18.5353L22.1596 3.86561L23.599 5.78382C23.6968 5.91419 23.8831 5.9413 24.0088 5.84347L25.6195 4.59033C25.7452 4.4925 25.7708 4.30545 25.6707 4.17198L23.3369 1.06187C22.941 0.534209 22.2118 0.428082 21.7028 0.824056L0.546033 17.2849C0.0370961 17.6809 -0.0539647 18.4252 0.341977 18.9529L16.7992 40.885C17.1951 41.4127 17.9243 41.5188 18.4333 41.1229L39.5871 24.6643C40.096 24.2683 40.1871 23.524 39.7911 22.9963L37.4574 19.8862C37.3573 19.7528 37.1733 19.7288 37.0475 19.8266ZM31.7421 11.5808L24.8854 11.4097C24.629 11.4028 24.4869 11.7001 24.643 11.908L26.4131 14.267L17.0127 21.5809C16.881 21.6834 16.8571 21.8789 16.9595 22.0155L18.2638 23.7537C18.3663 23.8903 18.5579 23.9182 18.6896 23.8157L28.09 16.5018L29.8601 18.8608C30.0161 19.0687 30.3382 19.005 30.396 18.7535L32.0356 11.9719C32.0468 11.9264 32.0477 11.8787 32.0382 11.8325C32.0287 11.7862 32.009 11.7426 31.9807 11.7049C31.9525 11.6672 31.9163 11.6364 31.8749 11.615C31.8336 11.5935 31.7882 11.5818 31.7421 11.5808Z"
                fill={isDarkMode ? "white" : "black"}
                stroke={isDarkMode ? "white" : "black"}
              />
            </svg>
          </a>
          <div
            className="wallet-copy"
            onClick={() =>{
              setIsWalletDetails(false)
              setIsLogout(true)
            }}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1019 15.7895C14.6382 15.7895 14.2497 15.6379 13.9366 15.3347C13.6223 15.0326 13.4652 14.6579 13.4652 14.2105V1.57895C13.4652 1.13158 13.6223 0.756316 13.9366 0.453158C14.2497 0.151053 14.6382 0 15.1019 0C15.5657 0 15.9547 0.151053 16.2689 0.453158C16.5821 0.756316 16.7387 1.13158 16.7387 1.57895V14.2105C16.7387 14.6579 16.5821 15.0326 16.2689 15.3347C15.9547 15.6379 15.5657 15.7895 15.1019 15.7895ZM15.1019 30C13.056 30 11.1399 29.6253 9.35363 28.8758C7.56629 28.1253 6.01137 27.1116 4.68886 25.8347C3.36527 24.5589 2.31447 23.0589 1.53647 21.3347C0.759551 19.6116 0.371094 17.7632 0.371094 15.7895C0.371094 14.1316 0.65098 12.5463 1.21075 11.0337C1.76943 9.52 2.55344 8.15789 3.56277 6.94737C3.86285 6.57895 4.24476 6.40105 4.70851 6.41368C5.17225 6.42737 5.58144 6.60526 5.93608 6.94737C6.23615 7.23684 6.37254 7.5921 6.34526 8.01316C6.31799 8.43421 6.16795 8.82895 5.89516 9.19737C5.18589 10.1184 4.63376 11.1379 4.23876 12.2558C3.84266 13.3747 3.64461 14.5526 3.64461 15.7895C3.64461 18.8684 4.75652 21.48 6.98033 23.6242C9.20305 25.7695 11.9102 26.8421 15.1019 26.8421C18.2936 26.8421 21.0008 25.7695 23.2235 23.6242C25.4473 21.48 26.5592 18.8684 26.5592 15.7895C26.5592 14.5526 26.3617 13.3616 25.9667 12.2163C25.5706 11.0721 25.0043 10.0395 24.2678 9.11842C23.995 8.77631 23.8449 8.40105 23.8177 7.99263C23.7904 7.58526 23.9268 7.23684 24.2269 6.94737C24.5542 6.63158 24.9498 6.46684 25.4135 6.45316C25.8773 6.44053 26.2592 6.60526 26.5592 6.94737C27.5959 8.15789 28.4006 9.52 28.9735 11.0337C29.5463 12.5463 29.8328 14.1316 29.8328 15.7895C29.8328 17.7632 29.4443 19.6116 28.6674 21.3347C27.8894 23.0589 26.8391 24.5589 25.5166 25.8347C24.193 27.1116 22.6381 28.1253 20.8519 28.8758C19.0645 29.6253 17.1479 30 15.1019 30Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="wallet-details-balance">
        <div className="balance-matic">{balance&&accounts?.length ?`${balance} MATIC`:<div><div className="loader-small"></div> MATIC</div>}</div>
      </div>
      <div className="wallet-details-footer">
        <div
          className="wallet-details-line"
          style={isDarkMode ? { border: "solid 1px #ffffff" } : {}}
        ></div>
        <div className="wallet-details-actions" onClick={()=>setIsTransaction(!isTransaction)}>
          <div className="wallet-details-action">Transactions</div>
          <div className="wallet-details-action-icons">
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.202541 14.5864L1.66831 15.9268L10.0739 8.50027L1.79274 0.927307L0.304949 2.2418L7.12037 8.47434L0.202541 14.5864Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </div>
        </div>
        <div className="wallet-details-actions" onClick={()=>setIsNetwork(!isNetwork)}>
          <div className="wallet-details-action">Network</div>
          <div className="wallet-details-action-icons">
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.202541 14.5864L1.66831 15.9268L10.0739 8.50027L1.79274 0.927307L0.304949 2.2418L7.12037 8.47434L0.202541 14.5864Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </div>
        </div>
        <div className="wallet-details-actions" onClick={()=>setIsMyPlayers(true)}>
          <div className="wallet-details-action">My Players</div>
          <div className="wallet-details-action-icons">
            <svg
              width="11"
              height="16"
              viewBox="0 0 11 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.202541 14.5864L1.66831 15.9268L10.0739 8.50027L1.79274 0.927307L0.304949 2.2418L7.12037 8.47434L0.202541 14.5864Z"
                fill={isDarkMode ? "white" : "black"}
              />
            </svg>
          </div>
        </div>
        <div className="wallet-details-actions">
          <div className="wallet-details-action">Language</div>
          <div className="wallet-details-action-icons">EN</div>
        </div>
        <div className="wallet-details-actions">
          <div className="wallet-details-action">Light mode</div>
          <div className="darkmode" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div
              className="darkmode-toggle"
              style={isDarkMode ? { background: "white" } : {}}
            >
              <div
                className={`darkmode-ball ${isDarkMode ? "dark" : ""}`}
              ></div>
              <div className="darkmode-icon" style={{ left: "30%" }}>
                <img alt="" src={darkmodeSun} />
              </div>
              <div className="darkmode-icon" style={{ left: "75%" }}>
                <img alt="" src={darkmodeMoon} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="functions-btns" style={isDarkMode? {borderTop: "solid 2px #ffffff"} : {borderTop: "solid 2px #000000"}}>
            <div className="wallet-actions" onClick={() => setIsLeaderboard(true)}><img alt="" src={leaderboardIcon}/></div>
            <div className="wallet-actions" onClick={() => setIsEvents(true)}>
              <img alt="" src={isNotification? notificationIcon : notificationMuteIcon}/>
              {counter !== 0 && <div className="notification-unread">{counter}</div>}
              </div>
            <div className="wallet-actions" onClick={() => setIsAudio((isAudio)=>!isAudio)}><img alt="" src={isAudio? unmuteIcon : muteIcon}/></div>
      </div>
      <div className="wallet-links" style={isDarkMode? {borderTop: "solid 2px #ffffff"} : {borderTop: "solid 2px #000000"}}>
        <a href='https://discord.gg/FGwhMDAv3s' target="_blank" className="wallet-link"><img alt="" src={discordLogo}/></a>
        <a href='https://opensea.io/collection/rabbits-vs-turtles' target="_blank" className="wallet-link"><img alt="" src={openSeaLogo}/></a>
        <a href='https://twitter.com/RabbitsVTurtles' target="_blank" className="wallet-link"><img alt="" src={twitterLogo}/></a>
        <a href='https://www.reddit.com/r/RabbitsVsTurtles/' target="_blank" className="wallet-link"><img alt="" src={reddisLogo}/></a>
        <a href='https://www.youtube.com/channel/UCHdqSybbS3OS6KYRCucZQ6Q' target="_blank" className="wallet-link"><img alt="" src={youtubeLogo}/></a>
      </div>
      {isNetwork && <NetworkModal isDarkMode={isDarkMode} closeFunc={() => setIsNetwork(false)}/>}
      {isMyPlayers && <MyPlayers closeFunc={() => setIsMyPlayers(!isMyPlayers)} height={'90%'}/>}
    </div>
  );
};

export default WalletDetails;
