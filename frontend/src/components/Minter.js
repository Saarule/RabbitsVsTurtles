import { useEffect, useState } from "react";
import Web3 from "web3";
import contract from "../contracts/contract.json";
import Alt from "../assets/logo.png"
import OpenSea from "../assets/open-sea-logo.png"
import Discord from "../assets/discord-logo.png"
import Twitter from "../assets/twitter-logo.png"
import ImageMinter from "../assets/preview4.gif"
import Logo from "../assets/logo3.png"
import LogoFacing from "../assets/logo4.png"


const initialInfoState = {
  connected: false,
  status: null,
  account: null,
  web3: null,
  contract: null,
  address: null,
  contractJSON: null,
};

const initialMintState = {
  loading: false,
  status: `Mint your ${contract.name} NFTs`,
  amount: 1,
  increaseAttackToNumber: 1,
  increaseDefenseToNumber: 1,
  increaseStaminaToNumber: 1,
  increaseArmorToNumber: 1,
  reviveplayerNumber: 1,
  attackerPlayerNumber: 1,
  attackedPlayerNumber: 1,
  supply: "0",
  cost: "0",
  gameInfo: [5,5,5,5,0,0,0,0],
  increaseAttackCost: "5000000000000000000",   // 5 Matic
  increaseDefenseCost: "5000000000000000000",   // 5 Matic
  increaseStaminaCost: "10000000000000000000",  // 10 Matic
  increaseArmorCost: "10000000000000000000",  // 10 Matic
  revivePlayerCost: "500000000000000000000", // 500 Matic
};

function Minter() {
  const [info, setInfo] = useState(initialInfoState);
  const [mintInfo, setMintInfo] = useState(initialMintState);

  console.log(info);

  const init = async (_request, _contractJSON) => {
    if (window.ethereum.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: _request,
        });
        const networkId = await window.ethereum.request({
          method: "net_version",
        });
        if (networkId == _contractJSON.chain_id) {
          let web3 = new Web3(window.ethereum);
          setInfo((prevState) => ({
            ...prevState,
            connected: true,
            status: null,
            account: accounts[0],
            web3: web3,
            contract: new web3.eth.Contract(
              _contractJSON.abi,
              _contractJSON.address
            ),
            contractJSON: _contractJSON,
          }));
        } else {
          setInfo(() => ({
            ...initialInfoState,
            status: `Change network to ${_contractJSON.chain}.`,
          }));
        }
      } catch (err) {
        console.log(err.message);
        setInfo(() => ({
          ...initialInfoState,
        }));
      }
    } else {
      setInfo(() => ({
        ...initialInfoState,
        status: "Please install metamask.",
      }));
    }
  };

  const initListeners = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }
  };

  const getSupply = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.totalSupply().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
      console.log(info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        supply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        supply: 0,
      }));
      getSupply();
    }
  };

  const getGameInfo = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.getGameInfo().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
    let newArray = [0,0,0,0,0,0,0,0];
    // console.log("Important 1: " +result);
    // console.log("Important 2: "+result.replace(/^0x+/, ''));
    let resultCleaned = result.replace(/^0x+/, '');
    // console.log("Important 3: "+resultCleaned);
    let resultArray = resultCleaned.match(/.{1,64}/g);
    // console.log("Important 4: " +resultArray);
    
    for(let i = 0; i < resultArray.length; i++){
      // console.log("Important 5: " +parseInt(resultArray[i]));
      newArray[i] = (parseInt(resultArray[i]));
    }

      setMintInfo((prevState) => ({
        ...prevState,
        gameInfo: newArray,
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        gameInfo: [5,5,5,5,0,0,0,0],
      }));
      getGameInfo();
    }
  };

  const getCost = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods.cost().encodeABI(),
    };
    try {
      const result = await window.ethereum.request({
        method: "eth_call",
        params: [params],
      });
      console.log("check this:",info.web3.utils.hexToNumberString(result));
      setMintInfo((prevState) => ({
        ...prevState,
        cost: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        cost: "0",
      }));
      getCost();
    }
  };

  const mint = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.cost) * mintInfo.amount + 10000000000000000) // The 10000000000000000 is solving an issue of overflow numbers when calculating the price.
      ),
      data: info.contract.methods
        .mint()
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Minting ${mintInfo.amount}...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! Your NFT will show up on Opensea, once the transaction is successful.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const increaseAttack = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.increaseAttackCost)) 
      ),
      data: info.contract.methods
        .increaseAttack(mintInfo.increaseAttackToNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Increasing Attack...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You've just increased attack to a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const increaseDefense = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.increaseDefenseCost)) 
      ),
      data: info.contract.methods
        .increaseDefense(mintInfo.increaseDefenseToNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Increasing Defense...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You've just increased defense to a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const increaseStamina = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.increaseStaminaCost)) 
      ),
      data: info.contract.methods
        .increaseStamina(mintInfo.increaseStaminaToNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Increasing Stamina...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You've just increased stamina to a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const increaseArmor = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.increaseArmorCost)) 
      ),
      data: info.contract.methods
        .increaseArmor(mintInfo.increaseArmorToNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Increasing Armor...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You've just increased armor to a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };


  const revivePlayer = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      value: String(
        info.web3.utils.toHex(Number(mintInfo.revivePlayerCost)) 
      ),
      data: info.contract.methods
        .revivePlayer(mintInfo.reviveplayerNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Reviving Player...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You just revived a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };

  const attackPlayer = async () => {
    const params = {
      to: info.contractJSON.address,
      from: info.account,
      data: info.contract.methods
        .attackPlayer(mintInfo.attackerPlayerNumber, mintInfo.attackedPlayerNumber)
        .encodeABI(),
    };
    try {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: true,
        status: `Attacking Player...`,
      }));
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [params],
      });
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status:
          "Nice! You've just attacked a player.",
      }));
      getSupply();
    } catch (err) {
      setMintInfo((prevState) => ({
        ...prevState,
        loading: false,
        status: err.message,
      }));
    }
  };


  const updateIncreaseAttackToNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        increaseAttackToNumber: newNumber,
      }));
    }
  };
  const updateIncreaseDefenseToNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        increaseDefenseToNumber: newNumber,
      }));
    }
  };
  const updateIncreaseStaminaToNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        increaseStaminaToNumber: newNumber,
      }));
    }
  };
  const updateIncreaseArmorToNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        increaseArmorToNumber: newNumber,
      }));
    }
  };

  const updaterevivePlayerNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        reviveplayerNumber: newNumber,
      }));
    }
  };

  const updateAttackerPlayerNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        attackerPlayerNumber: newNumber,
      }));
    }
  };

  const updateAttackedPlayerNumber = (newNumber) => {
    if (newNumber >= 1) {
      setMintInfo((prevState) => ({
        ...prevState,
        attackedPlayerNumber: newNumber,
      }));
    }
  };


  const connectToContract = (_contractJSON) => {
    init("eth_requestAccounts", _contractJSON);
  };

  useEffect(() => {
    connectToContract(contract);
    initListeners();
  }, []);

  useEffect(() => {
    if (info.connected) {
      getGameInfo();
      getSupply();
      getCost();
    }
  }, [info.connected]);

  return (
    
    <div className="page" >

       {/* ************** Counters starts here! ************** */}
<div style={{ display: "grid", paddingTop:100, gridTemplateColumns: "repeat(2, 10fr)", gridGap: 670 }}>
  <div>
    <div>
      <div style={{color:"#ebc596", fontSize:20}}>
      Rabbits: {mintInfo.gameInfo[1]} &#128007; <br></br>
      </div>
      <div style={{color:"#ebc596", fontSize:20}}>
      Alive: {mintInfo.gameInfo[3]}  &#128513;<br></br>
      </div>
      <div style={{color:"#ebc596", fontSize:20}}>
      Dead: {mintInfo.gameInfo[5]}  &#128123;<br></br>
      </div>
      <div style={{color:"#ebc596", fontSize:20}}>
      Revived: {mintInfo.gameInfo[7]}  &#128519;<br></br>
      </div>
    </div>
  </div>
  <div> 
    <div>
      <div style={{color:"#c2feff", fontSize:20}}>
      Turtles: {mintInfo.gameInfo[0]}  &#128034;<br></br>
      </div>
      <div style={{color:"#c2feff", fontSize:20}}>
      Alive: {mintInfo.gameInfo[2]}  &#128513;<br></br>
      </div>
      <div style={{color:"#c2feff", fontSize:20}}>
      Dead: {mintInfo.gameInfo[4]}  &#128123;<br></br>
      </div>
      <div style={{color:"#c2feff", fontSize:20}}>
      Revived: {mintInfo.gameInfo[6]}  &#128519;<br></br>
      </div>
      </div>
    </div>
  </div>
        {/* ************** Counters ends here! ************** */}


       {/* ************** Intro starts here! ************** */}

       <div style={{color:"#ffffff", paddingTop:50 ,paddingLeft:15}}> 
        <img src={Logo} />
      </div>

      <div style={{color:"#ffffff", paddingTop:20,paddingBottom:50,paddingLeft:38} }> 
        <img style={{width:800 }} src={LogoFacing} />
      </div>

      <div style={{color:"#ffffff"}}>
      <div style={{ color:"#c2feff", height: 20, paddingLeft:50 ,paddingTop:50, paddingBottom:50, fontSize:40, fontFamily:"slapstickShaded", textAlign:"center"}}> Duty is calling!</div>
      <div style={{ height: 20, paddingTop:0, paddingBottom:20, fontSize:20, fontFamily:"slapstick", textAlign:"center"}}> Ready to take your part at the greatest war between the rabbits and the turtles?</div>
      <div style={{ height: 20, paddingTop:0, paddingBottom:20, fontSize:20, fontFamily:"slapstick", textAlign:"center"}}> Rabbits Vs. Turtles is 100% on-chain, dynamic, NFT game. </div>
      <div style={{ height: 20, paddingTop:0, paddingBottom:20, fontSize:20, fontFamily:"slapstick", textAlign:"center"}}> The NFTs change dynamically as the game progress and each NFT mirrors the complete status of the player in the game!</div>
      <div style={{ height: 20, paddingTop:0, paddingBottom:20, fontSize:20, fontFamily:"slapstick", textAlign:"center"}}>Connect your wallet to the Polygon network, mint your NFT and join the game!</div>

      </div>
      
       {/* ************** Intro ends here! ************** */}

      <div className="card">
        <div className="card_header">
          <img className="card_header_image ns" alt={Alt} src={ImageMinter} />
        </div>
        {mintInfo.supply < contract.total_supply ? (
          <div className="card_body">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* ************** Mint start here! ************** */}
              <div style={{ width: 10 }}></div>
              <button style={{letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => mint()}
              >
                Mint
              </button>
            </div>

            {/* ************** Mint ends here! ************** */}
            {/* ************** Flex List start here! ************** */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >

              </div>
            {info.connected ? (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  {info.web3?.utils.fromWei(mintInfo.cost, "ether") *
                    mintInfo.amount}{" "}
                  {contract.chain_symbol}
                </p>
                <div style={{ width: 20 }}></div>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  |
                </p>
                <div style={{ width: 20 }}></div>
                <p style={{ color: "var(--statusText)", textAlign: "center" }}>
                  {mintInfo.supply}/{contract.total_supply}
                </p>
              </div>
            ) : null}
            {mintInfo.status ? (
              <p className="statusText">{mintInfo.status}</p>
            ) : null}
            {info.status ? (
              <p className="statusText" style={{ color: "var(--error)" }}>
                {info.status}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="card_body">
            <p style={{ color: "var(--statusText)", textAlign: "center" }}>
              {mintInfo.supply}/{contract.total_supply}
            </p>
            <p className="statusText">
              We've sold out! .You can still buy and trade the {contract.name}{" "}
              on marketplaces such as Opensea.
            </p>
          </div>
        )}
        <div className="card_footer colorGradient">
          <button
            className="button"
            style={{
              backgroundColor: info.connected
                ? "var(--success)"
                : "var(--warning)",letterSpacing:1.5, fontFamily:"slapstick"
            }}
            onClick={() => connectToContract(contract)}
          >
            {info.account ? "Connected" : "Connect Wallet"}
          </button>
          {info.connected ? (
            <span className="accountText">
              {String(info.account).substring(0, 6) +
                "..." +
                String(info.account).substring(38)}
            </span>
          ) : null}
        </div>
        <a
          style={{
            position: "absolute",
            bottom: -25,
            left: 110,
            color: "#ffffff",
            letterSpacing:1.5, fontFamily:"slapstick",
          }}
          target="_blank"
          href="https://polygonscan.com/address/0x829a67ef339e6230fcfdbf3c8730ffbb0329e796"
        >
          View Contract
        </a>
      </div>
      <div style={{ height: 20 }}></div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 0fr)", gridGap: 30, }}>

                {/* ************** Attack start here! ************** */}
                <div style={{width: 130}}>

                <div style={{ width: 10 }}></div>

                <div style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}} >Increase Attack to player number:</div>
                <div style={{paddingLeft:23}}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseAttackToNumber(mintInfo.increaseAttackToNumber - 1)}
              >
                -
                </button>
                 {" #"+mintInfo.increaseAttackToNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseAttackToNumber(mintInfo.increaseAttackToNumber + 1)}
              >
                +
              </button>
              </div>
              <button  style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => increaseAttack()}
              >
                Increase Attack
              </button>
              </div>
                {/* ************** Attack ends here! ************** */}
                {/* ************** Defense start here! ************** */}
                <div style={{width: 130}}>

                <div style={{ width: 10 }}></div>

                <div style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increase Defense to player number:</div>
                <div style={{paddingLeft:23}}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseDefenseToNumber(mintInfo.increaseDefenseToNumber - 1)}
              >
                -
                </button>

                 {" #"+mintInfo.increaseDefenseToNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseDefenseToNumber(mintInfo.increaseDefenseToNumber + 1)}
              >
                +
              </button>
              </div>
              <button  style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => increaseDefense()}
              >
                Increase Defense
              </button>
              </div>
                {/* ************** Defense ends here! ************** */}
                {/* ************** Stamina start here! ************** */}
                <div style={{width: 130}}>

                <div style={{ width: 10 }}></div>

                <div style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increase Stamina to player number:</div>
                <div style={{paddingLeft:23}}>
                <button 
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseStaminaToNumber(mintInfo.increaseStaminaToNumber - 1)}
              >
                -
                </button>

                 {" #"+mintInfo.increaseStaminaToNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseStaminaToNumber(mintInfo.increaseStaminaToNumber + 1)}
              >
                +
              </button>
              </div>
              <button style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => increaseStamina()}
              >
                Increase Stamina
              </button>
              </div>
                {/* ************** Stamina ends here! ************** */}
                {/* ************** Armor start here! ************** */}
                <div style={{width: 130}}>

                <div style={{ width: 10 }}></div>

                <div style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increase Armor to player number:</div>
                <div style={{paddingLeft:23}}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseArmorToNumber(mintInfo.increaseArmorToNumber - 1)}
              >
                -
                </button>

                 {" #"+mintInfo.increaseArmorToNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateIncreaseArmorToNumber(mintInfo.increaseArmorToNumber + 1)}
              >
                +
              </button>
              </div>
              <button style={{textAlign:"center", paddingBottom:10, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => increaseArmor()}
              >
                Increase Armor
              </button>
              </div>
                {/* ************** Armor ends here! ************** */}
                </div>
              



               <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 0fr)", gridGap: 20 }}>
                 
                  {/* ************** Revive start here! ************** */}
                <div style={{width: 200, paddingLeft:5, paddingTop:25}}>

                <div style={{paddingBottom:10, paddingLeft:32, fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Revive player number:</div>
                <div style={{paddingLeft:67}}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updaterevivePlayerNumber(mintInfo.reviveplayerNumber - 1)}
              >
                -
                </button>

                 {" #"+mintInfo.reviveplayerNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updaterevivePlayerNumber(mintInfo.reviveplayerNumber + 1)}
              >
                +
              </button>
              </div>
              <div style={{paddingLeft:48}}>
              <button style={{fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => revivePlayer()}
              >
                Revive Player
              </button>
              </div>
              </div>
                {/* ************** Revive ends here! ************** */}
              
                </div>
                  {/* ************** Attacking Player start here! ************** */}
               <div style={{width: 200, paddingTop:25}}>


                <div style={{paddingLeft:23, paddingBottom:10,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Attack player number:</div>

                <div style={{paddingLeft:"58px", paddingBottom:10 }}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateAttackedPlayerNumber(mintInfo.attackedPlayerNumber - 1)}
                >
                -
                </button>

                {" #"+mintInfo.attackedPlayerNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateAttackedPlayerNumber(mintInfo.attackedPlayerNumber + 1)}
                >
                +
                </button>
                </div>

                <div style={{paddingLeft:"25px",fontSize:15,letterSpacing:1.5, fontFamily:"slapstick", paddingBottom:10}}>with player number:</div>

                <div style={{paddingLeft:"59px"}}>
                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateAttackerPlayerNumber(mintInfo.attackerPlayerNumber - 1)}
                >
                -
                </button>

                {" #"+mintInfo.attackerPlayerNumber+" "} 

                <button
                disabled={!info.connected || mintInfo.cost == "0"}
                className="small_button"
                onClick={() => updateAttackerPlayerNumber(mintInfo.attackerPlayerNumber + 1)}
                >
                +
                </button>
                </div>

                <button style={{marginLeft: 35,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}
                disabled={!info.connected || mintInfo.cost == "0"}
                className="button"
                onClick={() => attackPlayer()}
                >
                Attack Player
                </button>
                </div>
                {/* ************** Attacking Player ends here! ************** */}
  
  
  <div style={{ height: 20, fontSize:15 }}></div>

      <div style={{color:"#c2feff"}}>
      <div style={{ height: 20, fontSize:28 , paddingTop:20, paddingBottom:30, fontFamily:"slapstickShaded",}}>
      How to play Rabbits Vs. Turtles:
      </div>
      </div>
      <ul class="a" style={{border:"white",}} >
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Every player that joins the game recives an NFT that represents the player's status in the game.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Each player receives pseudo-randomly generated attack and defense attributes.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>To attack another player successfully, your attack value should be greater than your opponent's defense AND your defense value should be greater than your opponent's attack.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>You can only attack players from the opponent team.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increasing your attack will give your player +5 in attack.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increasing your defense will give your player +5 in defense.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increasing your stamina will give your player +20 in attack.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increasing your armor will give your player +20 in defense.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Increasing your attack, defense, stamina or armor costs a fee.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Attacking other players is free!</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Your level is calculated based on your time alive and number of players you eliminated from the game.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>Every player can revive his Rabbit/Turtle only once in the game and it costs a fee.</li>
      <li style={{paddingBottom:5,fontSize:15, letterSpacing:1.5, fontFamily:"slapstick"}}>When a player joins the game, the minting price increases by 0.1%.</li>
      </ul>
      <div style={{color:"#c2feff" ,paddingTop:15,paddingBottom:20, fontSize:20, fontFamily:"slapstick"}}>
      Do you think you have what it takes to become the best of the best?
      </div>
      <div style={{color:"#c2feff", paddingBottom:10, fontSize:18, fontFamily:"slapstickShaded"}}>
      Join our discord to discuss the game and get help from other players.
      </div>
      <div style={{ height: 25 }}></div>
      <div style={{ display: "grid",  gridTemplateColumns: "repeat(3, 10fr)", gridGap: 10 }}>
      <div> 
        <a href="https://discord.gg/FGwhMDAv3s" target="_blank" rel="noopener noreferrer" >
        <img src={Discord} height={50} width={50} style={{borderRadius:50}} />
        </a>
      </div>
      <div> 
        <a href="https://opensea.io/collection/rabbits-vs-turtles" target="_blank" rel="noopener noreferrer">
        <img src={OpenSea} height={50} width={50}/>
        </a>
      </div>
      <div> 
        <a href="https://twitter.com/RabbitsVTurtles" target="_blank" rel="noopener noreferrer">
        <img src={Twitter} height={50} width={50} style={{borderRadius:50, border: 10}}  />
        </a>
      </div>
      </div>
      <div style={{ height: 20 }}></div>

    </div>
  );
}

export default Minter;
