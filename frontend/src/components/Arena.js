import { useEffect, useState } from "react";
import ArenaBackground from "../assets/arena-bg.svg";
import BattleBackground from "../assets/battle-bg.svg";
import FireAnimation from "../assets/fire.gif";
import FightingSound from "../assets/fighting.wav";

function Arena({ info, mintInfo }) {
  const [players, setPlayers] = useState([]);
  const [aliveRabbits, setAliveRabbits] = useState([]);
  const [aliveTurtles, setAliveTurtles] = useState([]);
  const [deadRabbits, setDeadRabbits] = useState([]);
  const [deadTurtles, setDeadTurtles] = useState([]);
  const [deadItems, setDeadItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRabbit, setSelectedRabbit] = useState();
  const [selectedTurtle, setSelectedTurtle] = useState();
  const [isOpenLeaderboard, setIsOpenLeaderBoard] = useState(false);
  const [isFighting, setIsFighting] = useState(false);
  const [turtleFilter, setTurtleFilter] = useState("alive");
  const [rabbitFilter, setRabbitFilter] = useState("alive");
  const audio = new Audio(FightingSound);

  const getData = async () => {
    setLoading(true);
    const rabbits = [];
    const turtles = [];
    const deadrabbits = [];
    const deadturtles = [];
    const dead = [];
    const players = [];
    for (let i = 1; i < mintInfo.gameInfo[1] + mintInfo.gameInfo[0]; i++) {
      const data = await info.contract.methods.tokenURI(i).call();
      const json = atob(data.substring(29));
      const result = JSON.parse(json);
      const type = await info.contract.methods.getPlayerType(i).call();
      const isAlive = await info.contract.methods.isAlive(i).call();
      if (isAlive) {
        if (type == "Turtle") {
          turtles.push(result);
        } else {
          rabbits.push(result);
        }
      } else {
        dead.push(result);
        if (type == "Turtle") {
          deadturtles.push(result);
        } else {
          deadrabbits.push(result);
        }
      }
      const player = await info.contract.methods.getPlayerByIndex(i).call();
      players.push(player);
    }
    setAliveRabbits(rabbits);
    setAliveTurtles(turtles);
    setDeadRabbits(deadrabbits);
    setDeadTurtles(deadturtles);
    setDeadItems(dead);
    players.sort((a, b) => b.kills - a.kills);
    setPlayers(players);
    setLoading(false);
  }

  useEffect(() => {
    info && info.contract && mintInfo && getData();
  }, [info, mintInfo])

  const startFighting = async () => {
    setIsFighting(true);
    const attackerID = selectedRabbit?.name.slice(selectedRabbit?.name.indexOf("#") + 1)
    const attackedID = selectedTurtle?.name.slice(selectedTurtle?.name.indexOf("#") + 1)
    await info.contract.methods.attackPlayer(attackerID, attackedID).send({ from: info.account });
    audio.play();
    // const timer = setTimeout(() => {
    //   setIsFighting(false);
    //   audio.pause();
    // }, 3000);
    // return () => clearTimeout(timer);
    audio.pause();
    setIsFighting(false);
  }

  return (
    <div style={{ position: "relative", backgroundImage: `url(${ArenaBackground})`, backgroundSize: "100% 100%", width: "1146px", display: "flex", flexDirection: "column", alignItems: "center", padding: "188px 0" }}>
      <div style={{ backgroundColor: "#3CD85E", color: "#000000", fontSize: "80px", lineHeight: "97px", textAlign: "center", width: "628px" }}>Arena</div>
      <div style={{ padding: "26px", display: "flex", gap: "20px" }}>
        <div style={{ backgroundColor: "#EC6363", width: "409px", height: "364px", position: "relative" }}>
          <div style={{ backgroundColor: "#D9D9D9", fontSize: "20px", color: "#000000", padding: "5px 18px", position: "absolute", top: "-5px", left: "10px" }}>Filter by:&nbsp;
            {turtleFilter == "alive" && <span style={{ cursor: "pointer" }} onClick={() => setTurtleFilter("dead")}>Alive</span>}
            {turtleFilter == "dead" && <span style={{ cursor: "pointer" }} onClick={() => setTurtleFilter("alive")}>Dead</span>}
          </div>
          {loading ? <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Loading...</div> :
            <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", padding: "50px" }}>
              {turtleFilter == "alive" && aliveTurtles.map(turtle => {
                return (<div key={turtle.name} onClick={() => setSelectedTurtle(turtle)} className={[selectedTurtle?.name == turtle.name && "turtle_active", "player_image_wrapper"].join(" ")}>
                  <img src={turtle.image} alt={`turtle`} className="player_image" />
                </div>);
              })}
              {turtleFilter == "dead" && deadTurtles.map(turtle => {
                return (<div key={turtle.name} onClick={() => setSelectedTurtle(turtle)} className={[selectedTurtle?.name == turtle.name && "turtle_active", "player_image_wrapper"].join(" ")}>
                  <img src={turtle.image} alt={`turtle`} className="player_image" />
                </div>);
              })}
            </div>}
        </div>
        <div style={{ backgroundColor: "#89AEF7", width: "409px", height: "364px", position: "relative" }}>
          <div style={{ backgroundColor: "#D9D9D9", fontSize: "20px", color: "#000000", padding: "5px 18px", position: "absolute", top: "-5px", left: "10px" }}>Filter by:&nbsp;
            {rabbitFilter == "alive" && <span style={{ cursor: "pointer" }} onClick={() => setRabbitFilter("dead")}>Alive</span>}
            {rabbitFilter == "dead" && <span style={{ cursor: "pointer" }} onClick={() => setRabbitFilter("alive")}>Dead</span>}
          </div>
          {loading ? <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Loading...</div> :
            <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", padding: "50px" }}>
              {rabbitFilter == "alive" && aliveRabbits.map(rabbit => {
                return (<div key={rabbit.name} onClick={() => setSelectedRabbit(rabbit)} className={[selectedRabbit?.name == rabbit.name && "rabbit_active", "player_image_wrapper"].join(" ")}>
                  <img src={rabbit.image} alt={`rabbit`} className="player_image" />
                </div>);
              })}
              {rabbitFilter == "dead" && deadRabbits.map(rabbit => {
                return (<div key={rabbit.name} onClick={() => setSelectedRabbit(rabbit)} className={[selectedRabbit?.name == rabbit.name && "rabbit_active", "player_image_wrapper"].join(" ")}>
                  <img src={rabbit.image} alt={`rabbit`} className="player_image" />
                </div>);
              })}
            </div>}
        </div>
      </div>
      <div style={{ background: `url(${BattleBackground})`, width: "877px", height: "524px", border: "10px solid #06EA61", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isFighting && <img src={FireAnimation} alt="fire" style={{ position: "absolute", zIndex: 3 }} width="100%" height="100%" />}
        <div style={{ backgroundColor: "#A8BAAA", color: "#000", position: "absolute", padding: "6px 8px", top: "-9px" }}>
          {selectedRabbit && <>
            <span style={{ fontSize: "20px" }}>Attack&nbsp;</span>
            <span style={{ fontSize: "20px", color: "#0047FC" }}>Rabbit&nbsp;</span>
            <span style={{ fontSize: "20px" }}>Number&nbsp;</span>
            <span style={{ fontSize: "20px", color: "#0047FC" }}>{selectedRabbit?.name.slice(selectedRabbit?.name.indexOf("#") + 1)}</span>
            <span style={{ fontSize: "20px" }}>&nbsp;With&nbsp;</span>
          </>}
          {selectedTurtle && <>
            <span style={{ fontSize: "20px", color: "#FF1616" }}>Turtle&nbsp;</span>
            <span style={{ fontSize: "20px" }}>Number&nbsp;</span>
            <span style={{ fontSize: "20px", color: "#FF1616" }}>{selectedTurtle?.name.slice(selectedTurtle?.name.indexOf("#") + 1)}</span>
          </>}
        </div>
        <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "65px" }}>
          <div style={{ width: "333px", height: "333px", background: "linear-gradient(139deg, rgba(148,74,74,1) 0%, rgba(231,121,121,1) 35%, rgba(217,113,119,1) 55%, rgba(150,74,111,1) 100%)" }}>
            {selectedTurtle && <img src={selectedTurtle.image} alt={`selected turtle`} />}
          </div>
          <div style={{ width: "333px", height: "333px", background: "linear-gradient(139deg, rgba(61,78,185,1) 0%, rgba(100,127,214,1) 34%, rgba(94,130,201,1) 55%, rgba(0,33,175,1) 100%)" }}>
            {selectedRabbit && <img src={selectedRabbit.image} alt={`selected rabbit`} />}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "-9px", padding: "20px 50px", backgroundColor: "#348546" }}>
          <button style={{ padding: "5px 20px", fontSize: "20px", backgroundColor: "#D9D9D9", border: "none", cursor: "pointer" }} disabled={!(selectedRabbit && selectedTurtle)} onClick={startFighting}>Fight!</button>
        </div>
      </div>
      <div style={{ position: "relative", backgroundColor: "#E5FDEA", width: "510px", height: "228px", marginTop: "50px", padding: "15px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: "20px", color: "#000" }}>Graveyard</div>
        {loading ? <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", color: "#999" }}>Loading...</div> :
          <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", padding: "50px", width: "100%", height: "100%", maxHeight: "200px", overflow: "scroll" }}>
            {deadItems.map(dead => {
              return (<div key={dead.name} style={{ padding: "5px" }}>
                <img src={dead.image} alt={`dead`} className="player_image" />
              </div>);
            })}
          </div>}
      </div>
      <div style={{ marginTop: "10px" }}>
        <button style={{ backgroundColor: "#E7EB32", padding: "20px 50px", color: "#000", fontSize: "20px", border: "none", cursor: "pointer" }} onClick={() => setIsOpenLeaderBoard(true)}>Leaderboard</button>
        {isOpenLeaderboard && <div style={{ position: "absolute", bottom: 50, boxShadow: "0 0 25px black", borderRadius: "10px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#0184f9", width: "350px", height: "500px", padding: "80px 50px" }}>
          <div style={{ position: "relative", backgroundColor: "#fffeef", borderRadius: "30px", height: "100%", height: "400px", padding: "70px 20px 30px 20px" }}>
            <div style={{ position: "absolute", top: "-20px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(90deg, #00a1f7, #0058cc)", padding: "10px 20px", fontSize: "20px", borderRadius: "10px" }}>LEADERBOARD</div>
            <div style={{ height: "350px", overflow: "scroll", display: "flex", flexDirection: "column", gap: "10px" }}>
              {players.map((player, index) => {
                return <div style={{ background: "linear-gradient(90deg, #02a2fc, #0255c8)", padding: "5px 20px", borderRadius: "10px", display: "flex", justifyContent: "center" }}>
                  <span style={{ fontSize: "16px" }}>{`${index + 1}.`}</span>
                  <span style={{ fontSize: "16px" }}>{player.name}</span>
                  <span style={{ fontSize: "16px", padding: "0 10px" }}>{player.kills}</span>
                </div>
              })}
            </div>
            <button style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(#00a1f7, #0058cc)", padding: "10px 20px", fontSize: "20px", borderRadius: "10px", outline: "none", border: "none", color: "#fff", cursor: "pointer" }} onClick={() => setIsOpenLeaderBoard(false)}>EXIT</button>
          </div>
        </div>}
      </div>
    </div>
  );
}

export default Arena;
