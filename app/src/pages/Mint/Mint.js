import React, { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";

import "./mint.css";
import WaitingToConnect from "../../components/WaitingToConnect/WaitingToConnect";
import Notification from "../../components/Notification/Notification";
import turtlePic from "../../assets/pic/mint-turtle.png";
import rubbitPic from "../../assets/pic/mint-rubbit.png";
import mintCoinIcon from "../../assets/pic/matic-coint.png";
import mintBtn from "../../assets/pic/mint-btn.png";
import mintRockRed from "../../assets/pic/mint-rock-red.png";
import mintRockBlue from "../../assets/pic/mint-rock-blue.png";


const Mint = ({ setActivePage, info }) => {
  const [mintInfo, setMintInfo] = useState({ cost: "0", supply: "0" });
  const [switchMint, setSwitchMint] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [notificationDetails, setNotificationDetails] = useState({type: false, msg: ''});
  const intervalId = useRef(0);
  const timeoutId = useRef(0);
  const {
    accounts,
    isActive,
    provider,
  } = useWeb3React();

  useEffect(() => {
    if (!isActive) setActivePage("welcome");
  }, [isActive]);

  useEffect(() => {
    getCost();
    getSupply();
    intervalId.current = setInterval(() => {
      setSwitchMint((switchMint) => !switchMint);
    }, 500);
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  const getCost = async () => {
    const params = {
      to: info.contractJSON.address,
      data: info.contract.methods.cost().encodeABI(),
    };
    try {
      const result = await info.web3.eth.call(params);
      setMintInfo((prevState) => ({
        ...prevState,
        cost: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      console.log(err);
      setMintInfo((prevState) => ({
        ...prevState,
        cost: "0",
      }));
      // getCost();
    }
  };

  const getSupply = async () => {
    const params = {
      to: info.contractJSON.address,
      data: info.contract.methods.totalSupply().encodeABI(),
    };
    try {
      const result = await info.web3.eth.call(params);
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      console.log("supply error", err);
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 0,
      }));
      // getSupply();
    }
  };

  const mint = async () => {
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      value: String(
        info.web3.utils.toHex(Number(mintInfo.cost) + 10000000000000000) // The 10000000000000000 is solving an issue of overflow numbers when calculating the price.
      ),
      data: info.contract.methods.mint().encodeABI(),
    };
    try {
      setActiveModal('confirmation')
      const txHash = await provider.getSigner().sendTransaction(params);
      console.log(txHash);
      setActiveModal('')
      getSupply();
    } catch (err) {
      setNotificationDetails({type: false, msg: 'Failed to send the transaction'})
      setActiveModal('notification')
      timeoutId.current = setTimeout(()=>setActiveModal(''), 4000)
      console.log(err);
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

  const closeNote = ()=>{
    clearTimeout(timeoutId.current)
    setActiveModal('')
  }

  info.contract.events.Transfer().on('data', (event) => {
    console.log(event);
    // if(from === "0x0000000000000000000000000000000000000000" && to === accounts[0]){
    //   setNotificationDetails({type: true, msg: 'Failed to send the transaction'})
    //   setActiveModal('notification')
    //   timeoutId.current = setTimeout(()=>setActiveModal(''), 4000)

    // }
  });

  if (!isActive) return;
  return (
    <div className="mint">
      {activeModal === 'confirmation' && <WaitingToConnect closeFunction={()=>setActiveModal('')} header={'Waiting for confirmation'} orangetxt={'Confirm this transaction in your wallet'}/>}
      {activeModal === 'notification' && <Notification type={notificationDetails.type} msg={notificationDetails.msg} closeFunc={closeNote}/>}
      <div className="mint-data" style={getMintDataBackground()}>
        <div className="mint-nft">
          <div>
            {switchMint ? (
              <img alt="" src={turtlePic} />
            ) : (
              <img alt="" src={rubbitPic} />
            )}
          </div>
        </div>
          <div>Mint your Rabbits VS Turtles NFTs</div>
        <div className="mint-details">
          <div className="mint-price">
            <div>
              {Number(info.web3?.utils.fromWei(mintInfo.cost, "ether")).toFixed(
                2
              )}
            </div>
            <div className="mint-coint">
              <img alt="" src={mintCoinIcon} />
              Matic
            </div>
          </div>
          <div className="mint-btn" onClick={mint}>
            <img alt="" src={mintBtn} />
            <div className="mint-mint">MINT</div>
          </div>
          <div className="mint-amount-players">
            <div>{`${mintInfo.supply}/${info.contractJSON.total_supply}`}</div>
            <div>
              {accounts[0]
                ? `${String(accounts[0]).substring(0, 6)}...${String(
                    accounts[0]
                  ).substring(38)}`
                : "Guest"}
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
