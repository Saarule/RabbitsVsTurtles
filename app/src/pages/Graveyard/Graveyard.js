import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { selectAllPlayers } from "../../features/playersSlice";
import { useSelector } from "react-redux";
import { selectAllInfo } from "../../features/infoSlice";

import "./graveyard.css";
import ChoosePlayer from "../../components/ChoosePlayer/ChoosePlayer";
import Player from "../../components/Player/Player";
import MainBtn from "../../components/MainBtn/MainBtn";
import { Flip, toast } from "react-toastify";

const Graveyard = ({confirmTransaction}) => {
  const [choosenPlayer, setChoosenPlayer] = useState();
  const [activeStage, setActiveStage] = useState("choosePlayer");
  const [playersData, setPlayersData] = useState([]);
  const { accounts, provider } = useWeb3React();
  const revivePlayerCost = "500000000000000000000";
  const players = useSelector(selectAllPlayers)
  const info = useSelector(selectAllInfo)

  useEffect(()=>{
    let filterPlayers = players.filter(
      (player) =>{ 
        if(choosenPlayer?.id === player.id) setChoosenPlayer(player)
        return !player.player.alive
      });
      setPlayersData(filterPlayers)
  },[players])

  const setChoosen = (choosen) => {
    setChoosenPlayer(choosen);
    setActiveStage("revive");
  };

  const revivePlayer = async () => {
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      value: String(info.web3.utils.toHex(Number(revivePlayerCost))),
      data: info.contract.methods
        .revivePlayer(choosenPlayer.player.name.split("#")[1])
        .encodeABI(),
    };
    const res = confirmTransaction(params, {action: 'Revive', txt: 'You are about to revive player number #4', img: choosenPlayer.image, symbol: 'heart'})
    if(res){
      toast.warning('Insufficient funds', {
        theme: "light",
        position: "bottom-left",
        autoClose: 3000,
        transition: Flip,
      });
    }
  };

  return (
    <div className="graveyard">
      {activeStage === "choosePlayer" && (
        <ChoosePlayer playersData={playersData} setChoosen={setChoosen} />
      )}
      {activeStage === "revive" && (
        <div className="revive-player">
          <Player
            player={choosenPlayer}
            height="50%"
            onClickFunc={() => setActiveStage("choosePlayer")}
          />
          <div className="revive-txt">
            <div>{`You choosed to revive player number #${
              choosenPlayer.player.name.split("#")[1]
            }`}</div>
            <div>Are you sure?</div>
          </div>
          <div className="revive-btn">
            <MainBtn txt="revive" func={revivePlayer} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Graveyard;
