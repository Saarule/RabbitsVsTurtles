import { useEffect, useState } from "react";
import ArenaBackground from "../assets/arena-bg.png";
import { alert } from "react-custom-alert";

function Arena({ info, mintInfo }) {
  const [players, setPlayers] = useState([]);
  const [aliveRabbits, setAliveRabbits] = useState([]);
  const [aliveTurtles, setAliveTurtles] = useState([]);
  const [deadItems, setDeadItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenLeaderboard, setIsOpenLeaderBoard] = useState(false);
  const [isOpenLastEvents, setIsOpenLastEvents] = useState(false);
  const [isOpenTurtlePlayerCard, setIsOpenTurtlePlayerCard] = useState(false);
  const [isOpenDeadPlayerCard, setIsOpenDeadPlayerCard] = useState(false);
  const [isOpenRabbitPlayerCard, setIsOpenRabbitPlayerCard] = useState(false);
  const [pastEvents, setPastEvents] = useState([]);

  const [deadRabbits, setDeadRabbits] = useState([]);
  const [deadTurtles, setDeadTurtles] = useState([]);

  const [selectedTurtle, setSelectedTurtle] = useState();
  const [selectedRabbit, setSelectedRabbit] = useState();
  const [selectedDead, setSelectedDead] = useState();

  const getData = async () => {
    setLoading(true);
    getPastEvents();
    const rabbits = [];
    const rabbitsOwner = [];
    const turtles = [];
    const turtlesOwner = [];
    const deadrabbits = [];
    const deadturtles = [];
    const dead = [];
    const players = [];
    for (let i = 1; i <= mintInfo.gameInfo[1] + mintInfo.gameInfo[0]; i++) {
      // console.time('checkTime')

      const [data, type, isAlive, owner, player] = await Promise.all([
        info.contract.methods.tokenURI(i).call(),
        info.contract.methods.getPlayerType(i).call(),
        info.contract.methods.isAlive(i).call(),
        info.contract.methods.ownerOf(i).call(),
        info.contract.methods.getPlayerByIndex(i).call(),
      ]);
      const json = atob(data.substring(29));
      const result = JSON.parse(json);

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

    // console.timeEnd('checkTime')
  };

  const chosenTurtle = (turtle) => {
    setSelectedTurtle(turtle);

    setIsOpenLeaderBoard(false);
    setIsOpenRabbitPlayerCard(false);
    setIsOpenDeadPlayerCard(false);
    setIsOpenTurtlePlayerCard(true);
  };
  const chosenDead = (dead) => {
    setSelectedDead(dead);

    setIsOpenLeaderBoard(false);
    setIsOpenRabbitPlayerCard(false);
    setIsOpenTurtlePlayerCard(false);
    setIsOpenDeadPlayerCard(true);
  };
  const chosenRabbit = (rabbit) => {
    setSelectedRabbit(rabbit);

    setIsOpenLeaderBoard(false);
    setIsOpenTurtlePlayerCard(false);
    setIsOpenDeadPlayerCard(false);
    setIsOpenRabbitPlayerCard(true);
  };

  const getPastEvents = async () => {
    let blockNo = 33057700
    let allPastEvents = []
    for(let i=0; i<15 ; i++){
      const pastEvents = await info.contract.getPastEvents(
        'allEvents',
        {fromBlock:  blockNo,
        toBlock: blockNo+10000}
        );
        blockNo += 10000
        allPastEvents = [...allPastEvents, ...pastEvents]
      }
    console.log(allPastEvents);
      setPastEvents(allPastEvents)
  };

  useEffect(() => {
    info && info.contract && mintInfo && getData();
  }, [info, mintInfo]);

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${ArenaBackground})`,
        backgroundSize: "100% 100%",
        width: "1146px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "188px 0",
        borderRadius: "50px",
        border: "10px solid black",
        paddingTop: "220px",
      }}
    >
      {/* <div style={{ fontSize: "40px", color: "white", letterSpacing:1.5, lineHeight: 1, fontFamily:"slapstick" , height:50}}>Game Overview</div> */}

      {/* Info about connected user starts here */}

      {info.connected ? (
        <span
          className="accountText"
          style={{
            fontSize: 15,
            color: "black",
            position: "absolute",
            top: "5px",
            right: "26px",
          }}
        >
          {String(info.account).substring(0, 6) +
            "..." +
            String(info.account).substring(38)}
        </span>
      ) : null}
      <span
        style={{
          position: "absolute",
          color: "#092a85",
          fontSize: 16,
          top: "45px",
          right: "50px",
        }}
      >
        {info.account ? "Connected" : "Connect Wallet"}
      </span>

      {/* Info about connected user ends here */}

      {/* ************** All 3 sections starts here! ************** */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            window.innerWidth < 891 ? "repeat(1, 10fr)" : "repeat(3, 10fr)",
          gridGap: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "#e34464",
            width: "210px",
            height: "228px",
            marginTop: "50px",
            padding: "15px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "3px solid black",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "white",
              letterSpacing: 1.5,
              lineHeight: 1,
              fontFamily: "slapstick",
              height: 70,
            }}
          >
            Turtles
          </div>
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              Loading... <span style={{ paddingLeft: 3 }}></span>
              <div
                className="spinner-loader"
                style={{ borderTop: "3px solid #800000" }}
              ></div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "25% 25% 25% 25%",
                padding: "50px",
                width: "100%",
                height: "100%",
                maxHeight: "200px",
                overflow: "scroll",
              }}
            >
              {aliveTurtles.map((turtle) => {
                return (
                  <div key={turtle.name} style={{ padding: "5px" }}>
                    <img
                      src={turtle.image}
                      alt={`turtle`}
                      style={{ cursor: "pointer" }}
                      className="player_image"
                      onClick={() => chosenTurtle(turtle)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          style={{
            position: "relative",
            backgroundColor: "#a4a5ab",
            width: "210px",
            height: "228px",
            marginTop: "50px",
            padding: "15px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "3px solid black",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "white",
              letterSpacing: 1.5,
              lineHeight: 1,
              fontFamily: "slapstick",
              height: 70,
            }}
          >
            Graveyard
          </div>
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              Loading... <span style={{ paddingLeft: 3 }}></span>
              <div
                className="spinner-loader"
                style={{ borderTop: "3px solid #707070" }}
              ></div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "25% 25% 25% 25%",
                padding: "50px",
                width: "100%",
                height: "100%",
                maxHeight: "200px",
                overflow: "scroll",
              }}
            >
              {deadItems.map((dead) => {
                return (
                  <div key={dead.name} style={{ padding: "5px" }}>
                    <img
                      src={dead.image}
                      alt={`dead`}
                      style={{ cursor: "pointer" }}
                      className="player_image"
                      onClick={() => chosenDead(dead)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div
          style={{
            position: "relative",
            backgroundColor: "#4596c4",
            width: "210px",
            height: "228px",
            marginTop: "50px",
            padding: "15px 40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            border: "3px solid black",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "white",
              letterSpacing: 1.5,
              lineHeight: 1,
              fontFamily: "slapstick",
              height: 70,
            }}
          >
            Rabbits
          </div>
          {loading ? (
            <div
              style={{
                position: "absolute",
                top: "55%",
                left: "52%",
                transform: "translate(-50%, -50%)",
                color: "white",
              }}
            >
              Loading... <span style={{ paddingLeft: 3 }}></span>
              <div
                className="spinner-loader"
                style={{ borderTop: "3px solid #001580" }}
              ></div>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "25% 25% 25% 25%",
                padding: "50px",
                width: "100%",
                height: "100%",
                maxHeight: "200px",
                overflow: "scroll",
              }}
            >
              {aliveRabbits.map((rabbit) => {
                return (
                  <div key={rabbit.name} style={{ padding: "5px" }}>
                    <img
                      src={rabbit.image}
                      alt={`rabbit`}
                      style={{ cursor: "pointer" }}
                      className="player_image"
                      onClick={() => chosenRabbit(rabbit)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ************** Players cards section starts here! ************** */}
        {isOpenTurtlePlayerCard && (
          <div
            style={{
              position: "absolute",
              bottom: 50,
              boxShadow: "0 0 25px black",
              borderRadius: "30px",
              left: "50%",
              top: "15%",
              transform: "translateX(-50%)",
              backgroundColor: "#eb4444",
              width: "350px",
              height: "400px",
              padding: "40px 25px 55px",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fffeef",
                borderRadius: "50px",
                height: "100%",
                height: "350px",
                padding: "60px 20px 10px 20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #f54d33, #ba3420)",
                  padding: "10px 20px",
                  fontSize: "22px",
                  borderRadius: "10px",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
              >
                Turtle #
                {selectedTurtle?.name.slice(
                  selectedTurtle?.name.indexOf("#") + 1
                )}
              </div>
              {selectedTurtle && (
                <img
                  style={{ borderRadius: 15 }}
                  src={selectedTurtle.image}
                  alt={`selected turtle`}
                />
              )}
            </div>
            <button
              className="exit-button-turtle"
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                fontSize: "20px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                letterSpacing: 1.5,
                lineHeight: 1,
                fontFamily: "slapstick",
              }}
              onClick={() => setIsOpenTurtlePlayerCard(false)}
            >
              EXIT
            </button>
          </div>
        )}

        {isOpenDeadPlayerCard && (
          <div
            style={{
              position: "absolute",
              bottom: 50,
              boxShadow: "0 0 25px black",
              borderRadius: "30px",
              left: "50%",
              top: "15%",
              transform: "translateX(-50%)",
              backgroundColor: "#b8baba",
              width: "350px",
              height: "400px",
              padding: "40px 25px 55px",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fffeef",
                borderRadius: "50px",
                height: "100%",
                height: "350px",
                padding: "60px 20px 10px 20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #a4a6a6, #787878)",
                  padding: "10px 20px",
                  fontSize: "22px",
                  borderRadius: "10px",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
              >
                Dead #
                {selectedDead?.name.slice(selectedDead?.name.indexOf("#") + 1)}
              </div>
              {selectedDead && (
                <img
                  style={{ borderRadius: 15 }}
                  src={selectedDead.image}
                  alt={`selected turtle`}
                />
              )}
            </div>
            <button
              className="exit-button-dead"
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                fontSize: "20px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                letterSpacing: 1.5,
                lineHeight: 1,
                fontFamily: "slapstick",
              }}
              onClick={() => setIsOpenDeadPlayerCard(false)}
            >
              EXIT
            </button>
          </div>
        )}

        {isOpenRabbitPlayerCard && (
          <div
            style={{
              position: "absolute",
              bottom: 50,
              boxShadow: "0 0 25px black",
              borderRadius: "30px",
              left: "50%",
              top: "15%",
              transform: "translateX(-50%)",
              backgroundColor: "#0184f9",
              width: "350px",
              height: "400px",
              padding: "40px 25px 55px",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fffeef",
                borderRadius: "50px",
                height: "100%",
                height: "350px",
                padding: "60px 20px 10px 20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #00a1f7, #0058cc)",
                  padding: "10px 20px",
                  fontSize: "22px",
                  borderRadius: "10px",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
              >
                Rabbit #
                {selectedRabbit?.name.slice(
                  selectedRabbit?.name.indexOf("#") + 1
                )}
              </div>
              {selectedRabbit && (
                <img
                  style={{ borderRadius: 15 }}
                  src={selectedRabbit.image}
                  alt={`selected turtle`}
                />
              )}
            </div>
            <button
              className="exit-button-rabbit"
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                padding: "10px 20px",
                fontSize: "20px",
                borderRadius: "10px",
                outline: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                letterSpacing: 1.5,
                lineHeight: 1,
                fontFamily: "slapstick",
              }}
              onClick={() => setIsOpenRabbitPlayerCard(false)}
            >
              EXIT
            </button>
          </div>
        )}
        {/* ************** Players cards section ends here! ************** */}
      </div>
      {/* ************** All 3 section ends here! ************** */}
      {/* ************** New leaderboard starts here! ************** */}
      <div style={{ marginTop: "10px" }}>
        <button
          className="leaderboard-button"
          style={{
            padding: "20px 50px",
            color: "#000",
            fontSize: "20px",
            border: "none",
            cursor: "pointer",
            letterSpacing: 1.5,
            lineHeight: 1,
            fontFamily: "slapstick",
            borderRadius: "30px",
            border: "4px solid black",
          }}
          onClick={() => setIsOpenLeaderBoard(true)}
        >
          Leaderboard
        </button>
        {isOpenLeaderboard && (
          <div
            style={{
              position: "absolute",
              bottom: 105,
              boxShadow: "0 0 25px black",
              borderRadius: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#0184f9",
              width: "350px",
              height: "500px",
              padding: "50px 40px",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fffeef",
                borderRadius: "30px",
                height: "100%",
                height: "400px",
                padding: "70px 20px 30px 20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #00a1f7, #0058cc)",
                  padding: "10px 20px",
                  fontSize: "22px",
                  borderRadius: "10px",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
              >
                LEADERBOARD
              </div>
              {loading ? (
                <div
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "52%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                  }}
                >
                  Loading... <span style={{ paddingLeft: 3 }}></span>
                  <div className="spinner-loader"></div>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    left: 37,
                    top: 48,
                    height: "415px",
                    overflow: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {players.map((player, index) => {
                    return (
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg, #02a2fc, #0255c8)",
                          padding: "5px 20px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "22px",
                            color:
                              index == 0
                                ? "gold"
                                : index == 1
                                ? "silver"
                                : index == 2
                                ? "#cd7f32"
                                : "white",
                            textShadow: "2px 2px 1px black",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "7px",
                          }}
                        >
                          {`${index + 1} ` + " "}
                        </span>
                        <span
                          style={{
                            fontSize: "18px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "4px",
                            paddingTop: "3px",
                            color: player[1] == "Rabbit" ? "blue" : "red",
                          }}
                        >
                          {"|"}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "5px",
                            paddingTop: "3px",
                          }}
                        >
                          {player[1]}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "4px",
                            paddingTop: "2px",
                          }}
                        >
                          {player.name.substring(19)}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            padding: "0 7px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            paddingTop: "2px",
                          }}
                        >
                          {"with: " + player.kills + " kills"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                className="exit-button"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "10px 20px",
                  fontSize: "20px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
                onClick={() => setIsOpenLeaderBoard(false)}
              >
                EXIT
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        <button
          className="leaderboard-button"
          style={{
            padding: "20px 50px",
            color: "#000",
            fontSize: "20px",
            border: "none",
            cursor: "pointer",
            letterSpacing: 1.5,
            lineHeight: 1,
            fontFamily: "slapstick",
            borderRadius: "30px",
            border: "4px solid black",
          }}
          onClick={() => setIsOpenLastEvents(true)}
        >
          Last Events
        </button>
        {isOpenLastEvents && (
          <div
            style={{
              position: "absolute",
              bottom: 105,
              boxShadow: "0 0 25px black",
              borderRadius: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#0184f9",
              width: "350px",
              height: "500px",
              padding: "50px 40px",
            }}
          >
            <div
              style={{
                position: "relative",
                backgroundColor: "#fffeef",
                borderRadius: "30px",
                height: "100%",
                height: "400px",
                padding: "70px 20px 30px 20px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "linear-gradient(90deg, #00a1f7, #0058cc)",
                  padding: "10px 20px",
                  fontSize: "22px",
                  borderRadius: "10px",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
              >
                Last Events
              </div>
              {pastEvents.length === 0 ? (
                <div
                  style={{
                    position: "absolute",
                    top: "55%",
                    left: "52%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                  }}
                >
                  Loading... <span style={{ paddingLeft: 3 }}></span>
                  <div className="spinner-loader"></div>
                </div>
              ) : (
                <div
                  style={{
                    position: "absolute",
                    left: 37,
                    top: 48,
                    height: "415px",
                    overflow: "scroll",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {pastEvents.map((event, index) => {
                    return (
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg, #02a2fc, #0255c8)",
                          padding: "5px 20px",
                          borderRadius: "10px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "22px",
                            color: "white",
                            textShadow: "2px 2px 1px black",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "7px",
                          }}
                        >
                          {`${index + 1} ` + " "}
                        </span>
                        <span
                          style={{
                            fontSize: "18px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "4px",
                            paddingTop: "3px",
                            color: event.event === "Attacked" ? "red" : "white",
                          }}
                        >
                          {"|"}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "5px",
                            paddingTop: "3px",
                          }}
                        >
                          {event.event}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            marginRight: "4px",
                            paddingTop: "2px",
                          }}
                        >
                          {event.event}
                        </span>
                        <span
                          style={{
                            fontSize: "16px",
                            padding: "0 7px",
                            letterSpacing: 1.5,
                            lineHeight: 1,
                            fontFamily: "slapstick",
                            paddingTop: "2px",
                          }}
                        >
                          {event.event}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                className="exit-button"
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  padding: "10px 20px",
                  fontSize: "20px",
                  borderRadius: "10px",
                  outline: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  letterSpacing: 1.5,
                  lineHeight: 1,
                  fontFamily: "slapstick",
                }}
                onClick={() => setIsOpenLastEvents(false)}
              >
                EXIT
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ************** New leaderboard ends here! ************** */}
      {/* ************** Attack section starts here! ************** */}

      {/* <div style={{paddingTop:20}}>
                <div style={{marginBottom:5}}>
                    <span style={{color:"black", fontSize:14, paddingRight:10}}>
                    Attacker Player:
                    </span>
                    <span style={{paddingRight:10}}>
                        <select name="Attacker" id="attackers">
                            <option value="Rabbit">Rabbit &#128007; </option>
                            <option value="Turtle">Turtle &#128034; </option>
                        </select>
                    </span>
                    <span style={{color:"black", fontSize:14, paddingRight:10}}>
                        Number 
                    </span>
                    <input style={{width:50}} type="number" pattern="[0-9]*">
                    </input>
                </div>
                <div>
                    <span style={{color:"black", fontSize:14, paddingRight:10}}>
                    Attacked Player:
                    </span>
                    <span style={{paddingRight:10}}>
                        <select name="Attacked" id="attackeds" >
                            <option value="Turtle">Turtle &#128034; </option>
                            <option value="Rabbit">Rabbit &#128007; </option>
                        </select>
                    </span>
                    <span style={{color:"black", fontSize:14, paddingRight:10}}>
                        Number 
                    </span>
                    <input style={{width:50}} type="number" pattern="[0-9]*">
                    </input>
                </div>
            </div> */}

      {/* ************** Attack section ends here! ************** */}

      {/* ************** Explore Map section starts here! ************** */}

      <div style={{ marginTop: 35, position: "absolute", bottom: 20 }}>
        <button
          style={{
            fontSize: 20,
            letterSpacing: 1.5,
            lineHeight: 1,
            fontFamily: "slapstick",
          }}
          class="glow-on-hover"
          type="button"
          onClick={() =>
            alert({
              message:
                "Coming Soon! Please follow updates on the website and social media to stay up to date.",
              type: "success",
            })
          }
        >
          Explore Map
        </button>
      </div>

      {/* ************** Explore Map section ends here! ************** */}
    </div>
  );
}

export default Arena;
