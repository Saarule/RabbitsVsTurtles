import React, { useEffect, useRef, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllInfo } from "../../features/infoSlice";
import { useSelector } from "react-redux";

import "./confirmation-modal.css";
import exitIcon from "../../assets/pic/exit-icon-white.png";
import mintRabbit from "../../assets/pic/mint-rubbit.png";
import mintTurtle from "../../assets/pic/mint-turtle.png";
import swordRight from "../../assets/pic/sword-right.png";
import swordLeft from "../../assets/pic/sword-left.png";
import shieldRight from "../../assets/pic/shield2-right.png";
import shieldLeft from "../../assets/pic/shield2-left.png";

const ConfirmationModal = ({ closeFunc, confirmFanc, params }) => {
  const [estimateGasFee, setEstimateGasFee] = useState(0);
  const [switchMint, setSwitchMint] = useState("");
  const [isBalance, setIsBalance] = useState(true);
  const { provider } = useWeb3React();
  const intervalId = useRef(0);
  const intervalMintId = useRef(0);
  const info = useSelector(selectAllInfo);
  const {desc} = params

  useEffect(() => {
    getEstimateGasFee();
    intervalId.current = setInterval(getEstimateGasFee, 4000);
    if (desc.action === "Mint")
      intervalMintId.current = setInterval(
        () => setSwitchMint((prev) => (prev === "red" ? "blue" : "red")),
        500
      );
    return () => {
      clearInterval(intervalId.current);
      clearInterval(intervalMintId.current);
    };
  }, []);

  const getEstimateGasFee = async () => {
    try {
      const estimateGasAmount = await info.web3.eth.estimateGas(params.params);
      const estimateGasPrice = await info.web3.eth.getGasPrice();
      setEstimateGasFee(
        info.web3.utils.fromWei(
          String(estimateGasAmount * estimateGasPrice * 1.1)
        )
      );
    } catch (err) {
      // clearInterval(intervalId.current);
      // setIsBalance(false);
      console.log(err);
    }
  };

  const getStyle = () =>{
    if(switchMint === 'red'){
      return{
        background: "linear-gradient(132.07deg, #bf4040 0%, #cc6677 35.49%, #bf406a 70.98%)",
        padding: '10%',
        position: 'relative',
        left: '1px'
      }
    }if(switchMint === 'blue'){
      return{
        background: "linear-gradient(138.99deg, #0000FF 6.81%, #0000FF 39.7%, #0000FF 72.59%)",
        padding: '10%'
      }
    }
    return {}
  }
  // console.log(switchMint);
  return (
    <div
      className="confirmation-modal"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="error-exit" onClick={closeFunc}>
        <img alt="" src={exitIcon} />
      </div>
      <div className="error-header">Confirm Transactions</div>
      {desc.action !== 'Attack'? <div className="desc-container">
        <div className="confirmation-desc">
          {desc.txt}
        </div>
        <div className="desc-img" >
          {switchMint !== '' && (
            <img alt="" style={getStyle()} src={switchMint === 'red'? mintTurtle: mintRabbit}/>
          )}
          {/* {switchMint === "blue" && (
            <img alt="" style={{width: '100%', padding: '10%', background: "linear-gradient(138.99deg, #0000FF 6.81%, #0000FF 39.7%, #0000FF 72.59%)" }} src={mintRabbit} />
          )}
          {switchMint === "red" && (
            <img alt="" style={{width: '100%', padding: '10%', background: "linear-gradient(132.07deg, #bf4040 0%, #cc6677 35.49%, #bf406a 70.98%)" }} src={mintTurtle} />
          )} */}
          {switchMint === "" && (<>
            <img alt="" src={desc.img} />
           {desc.symbol && <div className="desc-symbol"><img alt="" src={require(`../../assets/pic/${desc.symbol}.png`)} /></div>}
            </>)}
        </div>
      </div>:
      <div className="desc-container">
        <div className="confirmation-desc">
          {desc.txt}
        </div>
        <div className="desc-img-attack">
            <div className="attack-img">
              <img alt="" src={desc.turtleImg} />
              {desc.attacker === 'Rabbit'? <div className="turtle-defender"><img alt="" src={shieldRight} /></div>:
              <div className="turtle-attacker"><img alt="" src={swordRight} /></div>}
            </div>
            <div className="attack-img">
              <img alt="" src={desc.rabbitImg} />
              {desc.attacker === 'Rabbit'? <div className="rabbit-attacker"><img alt="" src={swordLeft} /></div>:
              <div className="rabbit-defender"><img alt="" src={shieldLeft} /></div>}        
            </div>
        </div>
      </div>}
      <div className="estimate-container">
        <div className="estimate-price">
          <div className="price-display">
            <div>Price</div>
            <div>
              {params.params.value
                ? Number(info.web3.utils.fromWei(params.params.value)).toFixed(
                    5
                  )
                : 0}
            </div>
          </div>
          <div className="price-display">
            <div>Estimated gas cost</div>
            <div>{Number(estimateGasFee).toFixed(5)}</div>
          </div>
        </div>
        <div className="price-display">
          <div>Total cost</div>
          <div>
            {params.params.value
              ? `${(
                  Number(info.web3.utils.fromWei(params.params.value)) +
                  Number(estimateGasFee)
                ).toFixed(5)} MATIC`
              : `${Number(estimateGasFee).toFixed(5)} MATIC`}
          </div>
        </div>
      </div>
      {isBalance ? (
        <div className="confirmation-btn" onClick={confirmFanc}>
          {`Confirm ${desc.action}`}
        </div>
      ) : (
        <div className="confirmation-btn enable">
          Insufficient MATIC balance
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
