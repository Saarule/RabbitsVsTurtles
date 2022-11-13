import React, { useEffect, useState } from "react";

import "./Overview.css";
import headerImg from "../../assets/pic/overview-header.png";
import dataImg from "../../assets/pic/overview-data.png";

const Overview = ({ info }) => {
  const [gameInfo, setGameInfo] = useState([]);

  useEffect(() => {
    getGameInfo();
  }, []);

  const getGameInfo = async () => {
    const params = {
      to: info.contractJSON.address,
      data: info.contract.methods.getGameInfo().encodeABI(),
    };
    try {
      console.log('begin');
      const result = await info.web3.eth.call(params);
      let newArray = [0, 0, 0, 0, 0, 0, 0, 0];
      //   console.log("Important 1: " +result);
      //   console.log("Important 2: "+result.replace(/^0x+/, ''));
      let resultCleaned = result.replace(/^0x+/, "");
      //   console.log("Important 3: "+resultCleaned);
      let resultArray = resultCleaned.match(/.{1,64}/g);
      //   console.log("Important 4: " +resultArray);
      for (let i = 0; i < resultArray.length; i++) {
        // console.log("Important 5: " +parseInt(resultArray[i],16));
        newArray[i] = parseInt(resultArray[i], 16);
      }
      setGameInfo(newArray);
      console.log(newArray);
    } catch (err) {
      setGameInfo([0, 0, 0, 0, 0, 0, 0, 0]);
      console.log(err);
    }
  };

  return (
    <div className="overview">
      <div className="overview-header">
        <img alt="" src={headerImg} />
        <div className="overview-main-header">OVERVIEW</div>
        <div className="overview-rabbit-header">TEAM RABBIT</div>
        <div className="overview-turtle-header">TEAM TURTLE</div>
        <div className="overview-score">
          <span className="overview-score-rabbit">{gameInfo[1]}</span> -{" "}
          <span className="overview-score-turtle">{gameInfo[0]}</span>
        </div>
      </div>
      <div className="overview-all-data">
        <div className="overview-data">
            <img alt="" src={dataImg} />
            <div className="data-rabbit">56</div>
            <div className="data-turtle">32</div>
            <div className="data-sector">Attacks</div>
        </div>
        <div className="overview-data">
            <img alt="" src={dataImg} />
            <div className="data-rabbit">56</div>
            <div className="data-turtle">32</div>
            <div className="data-sector">Upgrades</div>
        </div>
        <div className="overview-data">
            <img alt="" src={dataImg} />
            <div className="data-rabbit">{gameInfo[7]}</div>
            <div className="data-turtle">{gameInfo[6]}</div>
            <div className="data-sector">Revived</div>
        </div>
        <div className="overview-data">
            <img alt="" src={dataImg} />
            <div className="data-rabbit">{gameInfo[5]}</div>
            <div className="data-turtle">{gameInfo[4]}</div>
            <div className="data-sector">Dead</div>
        </div>
        <div className="overview-data">
            <img alt="" src={dataImg} />
            <div className="data-rabbit">{gameInfo[3]}</div>
            <div className="data-turtle">{gameInfo[2]}</div>
            <div className="data-sector">Alive</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
