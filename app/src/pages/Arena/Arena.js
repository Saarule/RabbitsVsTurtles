import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectAllPlayers,
  getPlayersError,
  getPlayersStatus,
} from "../../features/playersSlice";
import { selectAllInfo } from "../../features/infoSlice";
import { toast, Zoom, Flip } from "react-toastify";

import "./arena.css";
import ArenaPlayer from "../../components/ArenaPlayer/ArenaPlayer";
import headerImg from "../../assets/pic/frame-top.png";
import switchPositionImg from "../../assets/pic/switch-position.png";
import MainBtn from "../../components/MainBtn/MainBtn";
import Player from "../../components/Player/Player";
import filterRabbits from "../../assets/pic/filter-rabbits.png";
import filterTurtles from "../../assets/pic/filter-turtles.png";
import filterMyPlayers from "../../assets/pic/filter-my-players.png";
import { useWeb3React } from "@web3-react/core";

const Arena = ({ confirmTransaction }) => {
  const [choosenTurtle, setChoosenTurtle] = useState();
  const [choosenRabbit, setChoosenRabbit] = useState();
  const [attacker, setAttacker] = useState("Rabbit");
  const [playerHover, setPlayerHover] = useState("Rabbit");
  const [playersData, setPlayersData] = useState([]);
  const [onChoosePlayer, setOnChoosePlayer] = useState();
  const [err, setErr] = useState();
  const [filter, setFilter] = useState("");
  const { accounts } = useWeb3React();
  const players = useSelector(selectAllPlayers)
  const playersStatus = useSelector(getPlayersStatus);
  const error = useSelector(getPlayersError);
  const info = useSelector(selectAllInfo);

  useEffect(()=>{
    let filterPlayers = players.filter(
      (player) =>{ 
        if(choosenRabbit?.id === player.id) setChoosenRabbit(player)
        if(choosenTurtle?.id === player.id) setChoosenTurtle(player)
        return player.player.alive
      });
      setPlayersData(filterPlayers)
  },[players])

  const choosePlayer = (player) => {
    setErr(null);
    if (player.player.playerType === "Turtle") setChoosenTurtle(player);
    else setChoosenRabbit(player);
    setOnChoosePlayer(null);
  };

  const getPlayersToShow = () => {
    let playersToShow = playersData.filter(
      (player) => player.player.playerType === onChoosePlayer
    );
    if(accounts?.length){
      if(filter === 'Mine') playersToShow = playersToShow.filter(player=>player.owner === accounts[0])
      
    }
    return playersToShow
  };

  const onHover = (player) => {
    setPlayerHover(player);
  };

  const switchPosition = () => {
    setErr(null);
    if (attacker === "Turtle") setAttacker("Rabbit");
    else setAttacker("Turtle");
  };

  const attackPlayer = async () => {
    if (!choosenRabbit && !choosenTurtle) {
      toast.warning("Choose Players to Attack", {
        theme: "light",
        position: "top-center",
        autoClose: 1000,
        transition: Flip,
      });
      return;
    }
    if (!choosenRabbit) {
      toast.warning("Choose Rabbit before Attacking", {
        theme: "light",
        position: "top-center",
        autoClose: 1000,
        transition: Flip,
      });
      return;
    } else if (!choosenTurtle) {
      toast.warning("Choose Turtle before Attacking", {
        theme: "light",
        position: "top-center",
        autoClose: 1000,
        transition: Flip,
      });
      return;
    }
    let attack;
    let victim;
    if (attacker === "Rabbit") {
      attack = choosenRabbit.player.name.split("#")[1];
      victim = choosenTurtle.player.name.split("#")[1];
    } else {
      attack = choosenTurtle.player.name.split("#")[1];
      victim = choosenRabbit.player.name.split("#")[1];
    }
    const params = {
      to: info.contractJSON.address,
      from: accounts[0],
      data: info.contract.methods.attackPlayer(attack, victim).encodeABI(),
    };
    let res = await confirmTransaction(params, "Attack");
    if (res) {
      res = res.message.split(":")[2];
      setErr(res);
    }
  };
  const setNewFilter = (newFilter) => {};
  const filterPlayers = () => {};
  // console.log(playerHover);
  return (
    <div className="arena">
      <div className="arena-header">
        <img alt="" src={headerImg} />
        <div>ARENA</div>
      </div>
      <div className="arena-players">
        <div className="turtle-player">
          <ArenaPlayer
            type={"Turtle"}
            attacker={attacker === "Turtle"}
            player={
              playerHover?.player?.playerType === "Turtle"
                ? playerHover
                : choosenTurtle
            }
            func={() => setOnChoosePlayer("Turtle")}
          />
        </div>
        <div className="turtle-player">
          <ArenaPlayer
            type={"Rabbit"}
            attacker={attacker === "Rabbit"}
            player={
              playerHover?.player?.playerType === "Rabbit"
                ? playerHover
                : choosenRabbit
            }
            func={() => setOnChoosePlayer("Rabbit")}
          />
        </div>
      </div>
      <div className="switch-position" onClick={switchPosition}>
        <img alt="" src={switchPositionImg} />
      </div>
      <div className="arena-attack-btn">
        <MainBtn txt="ATTACK" func={attackPlayer} />
      </div>
      {err && <div className="arena-err">{err}</div>}
      {onChoosePlayer && (
        <div className="outside-click" onClick={() => setOnChoosePlayer(null)}>
          <div className="all-players-arena" onClick={e=>e.stopPropagation()}>
            <div className="players-list">
              {playersData.length ? (
                getPlayersToShow().map((player, idx) => {
                  return (
                    <Player
                      key={idx}
                      player={player}
                      onClickFunc={() => choosePlayer(player)}
                      onHover={onHover}
                      height={"50%"}
                    />
                  );
                })
              ) : (
                <div className="loader-container" style={{ height: "40%" }}>
                  <div className="loader"></div>
                </div>
              )}
            </div>
          <div className="players-filter">
          {onChoosePlayer === 'Turtle' && <img
            className={filter === "Turtle" ? "active" : ""}
            alt=""
            src={filterTurtles}
            onClick={() => setFilter("")}
            />}
          {onChoosePlayer === 'Rabbit' && <img
            className={filter === "Rabbit" ? "active" : ""}
            alt=""
            src={filterRabbits}
            onClick={() => setFilter("")}
            />}
          <img
            className={filter === "Mine" ? "active" : ""}
            alt=""
            src={filterMyPlayers}
            onClick={() => setFilter("Mine")}
            />
        </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Arena;
