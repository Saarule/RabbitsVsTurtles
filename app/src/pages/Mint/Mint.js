import React, { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllInfo } from "../../features/infoSlice";
import { useSelector } from "react-redux";
import { toast, Flip } from "react-toastify";

import "./mint.css";
import WaitingToConnect from "../../components/WaitingToConnect/WaitingToConnect";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import turtlePic from "../../assets/pic/mint-turtle.png";
import rubbitPic from "../../assets/pic/mint-rubbit.png";
import mintCoinIcon from "../../assets/pic/matic-coint.png";
import mintRockRed from "../../assets/pic/mint-rock-red.png";
import mintRockBlue from "../../assets/pic/mint-rock-blue.png";
import MainBtn from "../../components/MainBtn/MainBtn";


const Mint = ({ confirmTransaction, mintInfo, isAudio }) => {
  const [switchMint, setSwitchMint] = useState(true);
  const [activeModal, setActiveModal] = useState('confirmationModal');
  const intervalId = useRef(0);
  const timeoutId = useRef(0);
  const { accounts, isActive, provider, connector } = useWeb3React();
  const info = useSelector(selectAllInfo)
  const audio = new Audio(require('../../assets/music/Spooky4-Mint.mp3'))
  audio.loop = true

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setSwitchMint((switchMint) => !switchMint);
    }, 500);
  }, []);
  
  useEffect(()=>{
    console.log('aoudio');
    if(isAudio) audio.play()
    else{
      audio.pause()
      audio.currentTime = 0;
    }
    return ()=>{
      audio.pause()
      audio.currentTime = 0;
    }
  },[isAudio])

  const mint = async () => {
    if(accounts && accounts[0]){
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      value: String(
        info.web3.utils.toHex(Number(mintInfo.cost)) // The 10000000000000000 is solving an issue of overflow numbers when calculating the price.
      ),
      data: info.contract.methods.mint().encodeABI(),
    };
    console.log(info.web3.utils.fromWei(params.value));
    const res = await confirmTransaction(params, {action: 'Mint', txt: 'You are about to mint a new player and join the game!'})
    if(res){
      toast.warning(res.message, {
      theme: "light",
      position: "bottom-left",
      autoClose: 3000,
      transition: Flip,
    });
  }
    }else{
      toast.success('Connect your wallet', {theme: "dark"})
    }
  };

  const getMintDataBackground = () => {
    if (switchMint)
      return {
        background:
          "linear-gradient(132.07deg, #bf4040 0%, #cc6677 35.49%, #bf406a 70.98%)",
      };
    else
      return {
        background:
          "linear-gradient(138.99deg, #0000FF 6.81%, #0000FF 39.7%, #0000FF 72.59%)",
      };
  };

  const closeNote = () => {
    clearTimeout(timeoutId.current);
    setActiveModal("");
  };
  // console.log(mintInfo);
  return (
    <div className="mint">
      {activeModal === "confirmation" && (
        <WaitingToConnect
          closeFunction={() => setActiveModal("")}
          header={"Waiting for confirmation"}
          subHeader={"Mint your player"}
          orangetxt={"Confirm this transaction in your wallet"}
          loadingUp={true}
        />
      )}
      {activeModal === 'errorModal' && <ErrorModal/>}
      <div className="mint-data" style={getMintDataBackground()}>
        <div className="mint-nft">
            {switchMint ? (
              <img alt="" src={turtlePic} />
            ) : (
              <img alt="" src={rubbitPic} />
            )}
        </div>
        <div className="details-container">
          <div>Mint your Rabbits VS Turtles NFTs</div>
          <div className="mint-details">
            <div className="mint-price">
              <div>
                {mintInfo.cost? Number(
                  info.web3?.utils.fromWei(String(mintInfo.cost), "ether")
                ).toFixed(3):
                <div className="loader-small" style={{borderTop: '1px solid #ffffff', height: '16px'}}></div>
                }
              </div>
              <div className="mint-coint">
                <img alt="" src={mintCoinIcon} />
                Matic
              </div>
            </div>
            <div className="mint-btn">
              <MainBtn txt='MINT' func={mint}/>
            </div>
            <div className="mint-amount-players">
              <div>{mintInfo.totalSupply !== '0'?`${mintInfo.totalSupply}/21000`:
              <div><div className="loader-small" style={{borderTop: '1px solid #ffffff', height: '16px'}}></div>/{info.contractJSON.total_supply}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mint-rock">
        {switchMint ? (
          <img alt="" src={mintRockRed} />
        ) : (
          <img alt="" src={mintRockBlue} />
        )}
      </div>
    </div>
  );
};

export default Mint;
