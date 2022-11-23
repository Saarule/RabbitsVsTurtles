import React, { useEffect, useState, useRef } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllInfo } from "../../features/infoSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./mint.css";
import WaitingToConnect from "../../components/WaitingToConnect/WaitingToConnect";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import turtlePic from "../../assets/pic/mint-turtle.png";
import rubbitPic from "../../assets/pic/mint-rubbit.png";
import mintCoinIcon from "../../assets/pic/matic-coint.png";
import mintRockRed from "../../assets/pic/mint-rock-red.png";
import mintRockBlue from "../../assets/pic/mint-rock-blue.png";
import MainBtn from "../../components/MainBtn/MainBtn";


const Mint = ({ confirmTransaction, mintInfo }) => {
  const [switchMint, setSwitchMint] = useState(true);
  const [activeModal, setActiveModal] = useState('confirmationModal');
  const intervalId = useRef(0);
  const timeoutId = useRef(0);
  const { accounts, isActive, provider } = useWeb3React();
  const info = useSelector(selectAllInfo)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setSwitchMint((switchMint) => !switchMint);
    }, 500);
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

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
    const res = await confirmTransaction(params, 'Mint')
    // console.log('res:' + res);
    }else{
      toast.success('so easy', {theme: "dark"})
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
                {mintInfo.cost !== '0'? Number(
                  info.web3?.utils.fromWei(mintInfo.cost, "ether")
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
              <div>{mintInfo.totalSupply !== '0'?`${mintInfo.totalSupply}/${info.contractJSON.total_supply}`:
              <div><div className="loader-small" style={{borderTop: '1px solid #ffffff', height: '16px'}}></div>/{info.contractJSON.total_supply}</div>}
              </div>
              <div>
                {(accounts && accounts[0])
                  ? `${String(accounts[0]).substring(0, 6)}...${String(
                      accounts[0]
                    ).substring(38)}`
                  : "Guest"}
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
