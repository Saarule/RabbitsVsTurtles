import React, { useEffect, useState } from "react";

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

const Arena = ({ playersData, info, confirmTransaction }) => {

    const [choosenTurtle, setChoosenTurtle] = useState();
    const [choosenRabbit, setChoosenRabbit] = useState();
    const [attacker, setAttacker] = useState('Rabbit');
    const [onChoosePlayer, setOnChoosePlayer] = useState();
    // const [playersToShow, setPlayersToShow] = useState(playersData);
    const [filter, setFilter] = useState("");
    const { accounts } = useWeb3React();

    // useEffect(()=>{
    //     setPlayersToShow(playersData)
    // },[playersData])

    const choosePlayer = (player)=>{
        if(player.player.playerType === 'Turtle') setChoosenTurtle(player)
        else setChoosenRabbit(player)
        setOnChoosePlayer(null)
    }

    const getPlayersToShow =()=>{
        return playersData.filter(player=>player.player.playerType === onChoosePlayer)
    }

    const switchPosition = ()=>{
        if(attacker === 'Turtle') setAttacker('Rabbit')
        else setAttacker('Turtle')
    }

    const attackPlayer = ()=>{
      let attack
      let victim
      if(attacker === 'Rabbit'){
        attack = choosenRabbit.player.name.split('#')[1]
        victim = choosenTurtle.player.name.split('#')[1]
      }else{
        attack = choosenTurtle.player.name.split('#')[1]
        victim = choosenRabbit.player.name.split('#')[1]
      }
      const params = {
        to: info.contractJSON.address,
        from: accounts[0],
        data: info.contract.methods
          .attackPlayer(
            attack,
            victim
          )
          .encodeABI(),
      };
      confirmTransaction(params, 'Attack')
      console.log(params);
    }
    const setNewFilter = (newFilter) => { };
    const filterPlayers = () => {};

  return (
    <div className="arena">
      <div className="arena-header">
        <img alt="" src={headerImg} />
        <div>ARENA</div>
      </div>
      <div className="arena-players">
        <div className="turtle-player">
          <ArenaPlayer type={"Turtle"} attacker={attacker === 'Turtle'} player={choosenTurtle} func={()=>setOnChoosePlayer("Turtle")}/>
        </div>
        <div className="turtle-player">
          <ArenaPlayer type={"Rabbit"} attacker={attacker === 'Rabbit'} player={choosenRabbit} func={()=>setOnChoosePlayer("Rabbit")}/>
        </div>
      </div>
        <div className="switch-position" onClick={switchPosition}><img alt="" src={switchPositionImg} /></div>
        <div className="arena-attack-btn"><MainBtn txt='ATTACK' func={attackPlayer}/></div>
        {onChoosePlayer && <div className="all-players-arena">
        <div className="players-list">
          {getPlayersToShow().map((player, idx) => {
            return (
              <Player key={idx} player={player} onClickFunc={() => choosePlayer(player)} height={'50%'}/>
            );
          })}
        </div>
        {/* <div className="players-filter">
          <img
            className={filter === "Turtle" ? "active" : ""}
            alt=""
            src={filterTurtles}
            onClick={() => setNewFilter("Turtle")}
          />
          <img
            className={filter === "Rabbit" ? "active" : ""}
            alt=""
            src={filterRabbits}
            onClick={() => setNewFilter("Rabbit")}
          />
          <img
            className={filter === "Mine" ? "active" : ""}
            alt=""
            src={filterMyPlayers}
            onClick={() => setNewFilter("Mine")}
          />
        </div> */}
      </div>}
    </div>
  );
};

export default Arena;
