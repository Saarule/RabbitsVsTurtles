import { useEffect, useState } from "react";
import ArenaBackground from "../assets/arena-bg.svg";
import BattleBackground from "../assets/battle-bg.svg";

function Arena({ info, mintInfo }) {
  const [aliveRabbits, setAliveRabbits] = useState([]);
  const [aliveTurtles, setAliveTurtles] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    const rabbits = [];
    const turtles = [];
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
      }
    }
    setAliveRabbits(rabbits);
    setAliveTurtles(turtles);
    setLoading(false);
  }

  useEffect(() => {
    info && info.contract && mintInfo && getData();
  }, [info, mintInfo])

  return (
    <div style={{ backgroundImage: `url(${ArenaBackground})`, backgroundSize: "100% 100%", width: "1146px", display: "flex", flexDirection: "column", alignItems: "center", padding: "188px 0" }}>
      <div style={{ backgroundColor: "#3CD85E", color: "#000000", fontSize: "80px", lineHeight: "97px", textAlign: "center", width: "628px" }}>Arena</div>
      <div style={{ padding: "26px", display: "flex", gap: "20px" }}>
        <div style={{ backgroundColor: "#EC6363", width: "409px", height: "364px", position: "relative" }}>
          <div style={{ backgroundColor: "#D9D9D9", fontSize: "20px", color: "#000000", padding: "5px 18px", position: "absolute", top: "-5px", left: "10px" }}>Filter by: Alive</div>
          {loading ? <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Loading...</div> :
            <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", padding: "50px" }}>
              {aliveRabbits.map(rabbit => {
                return (<div key={rabbit.name} style={{ padding: "5px" }}>
                  <img src={rabbit.image} alt={`rabbit`} />
                </div>);
              })}
            </div>}
        </div>
        <div style={{ backgroundColor: "#89AEF7", width: "409px", height: "364px", position: "relative" }}>
          <div style={{ backgroundColor: "#D9D9D9", fontSize: "20px", color: "#000000", padding: "5px 18px", position: "absolute", top: "-5px", left: "10px" }}>Filter by: Alive</div>
          {loading ? <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>Loading...</div> :
            <div style={{ display: "grid", gridTemplateColumns: "25% 25% 25% 25%", padding: "50px" }}>
              {aliveTurtles.map(turtle => {
                return (<div key={turtle.name} style={{ padding: "5px" }}>
                  <img src={turtle.image} alt={`turtle`} />
                </div>);
              })}
            </div>}
        </div>
      </div>
      <div style={{ background: `url(${BattleBackground})`, width: "877px", height: "524px", border: "10px solid #06EA61", position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ backgroundColor: "#A8BAAA", color: "#000", position: "absolute", padding: "6px 8px", top: "-9px" }}>
          <span style={{ fontSize: "20px" }}>Attack</span>
          <span style={{ fontSize: "20px", color: "#0047FC" }}>Rabbit</span>
          <span style={{ fontSize: "20px" }}>Number</span>
          <span style={{ fontSize: "20px", color: "#0047FC" }}>45</span>
          <span style={{ fontSize: "20px" }}>With</span>
          <span style={{ fontSize: "20px", color: "#FF1616" }}>Turtle</span>
          <span style={{ fontSize: "20px" }}>Number</span>
          <span style={{ fontSize: "20px", color: "#FF1616" }}>12</span>
        </div>
        <div style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", display: "flex", gap: "65px" }}>
          <div style={{ width: "333px", height: "333px", background: "linear-gradient(139deg, rgba(148,74,74,1) 0%, rgba(231,121,121,1) 35%, rgba(217,113,119,1) 55%, rgba(150,74,111,1) 100%)" }}></div>
          <div style={{ width: "333px", height: "333px", background: "linear-gradient(139deg, rgba(61,78,185,1) 0%, rgba(100,127,214,1) 34%, rgba(94,130,201,1) 55%, rgba(0,33,175,1) 100%)" }}></div>
        </div>
        <div style={{ position: "absolute", bottom: "-9px", padding: "20px 50px", backgroundColor: "#348546" }}>
          <button style={{ padding: "5px 20px", fontSize: "20px", backgroundColor: "#D9D9D9", border: "none" }}>Fight!</button>
        </div>
      </div>
      <div style={{ backgroundColor: "#E5FDEA", width: "510px", height: "228px", marginTop: "50px", padding: "15px 40px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontSize: "20px", color: "#000" }}>Graveyard</div>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button style={{ backgroundColor: "#E7EB32", padding: "20px 50px", color: "#000", fontSize: "20px", border: "none" }}>Leaderboard</button>
      </div>
    </div>
  );
}

export default Arena;
