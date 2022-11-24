import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { selectAllInfo } from "./features/infoSlice";
import { ToastContainer, toast } from "react-toastify";
import { newPlayer, updatePlayer } from "./features/playersSlice";
import { store } from "./features/store";
import { addEvent } from "./features/eventsSlice";
import abi from './contracts/abi.json'

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Welcome from "./pages/Welcome/Welcome";
import Map from "./pages/Map/Map";
import Header from "./components/Header/Header2";
import Mint from "./pages/Mint/Mint";
import Shop from "./pages/Shop/Shop";
import Graveyard from "./pages/Graveyard/Graveyard";
import Arena from "./pages/Arena/Arena";
import Footer from "./components/Footer/Footer";
import ConfirmationModal from "./components/ConfirmationModal/ConfirmationModal";
import WaitingToConnect from "./components/WaitingToConnect/WaitingToConnect";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import Overview from "./pages/Overview/Overview";
import SubmittedModal from "./components/SubmittedModal/SubmittedModal";
import PlayerDetails from "./components/PlayerDetails/PlayerDetails";
import ConnectModal from "./components/ConnectModal/ConnectModal";
import FailToConnect from "./components/FailToConnect/FailToConnect";
import Web3 from "web3";

function App() {
  const [params, setParams] = useState({});
  const [error, setError] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [txHash, setTxHash] = useState("");
  const [chosenConnection, setChosenConnection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isNotification, setIsNotification] = useState(true);
  const [balance, setBalance] = useState("");
  const [mintInfo, setMintInfo] = useState({ cost: "0", totalSupply: '0' });
  const { provider, accounts, chainId, connector } = useWeb3React();
  const location = useLocation();
  const info = useSelector(selectAllInfo);
  const dispatch = useDispatch()
  
  useEffect(() => {
    startEventListener();
    getCost();
    getTotal()
  }, []);

  useEffect(() => {
    setBalance("");
    if (accounts?.length !== 0 && accounts) {
      getUserBalance();
    }
  }, [accounts]);

  const confirmTransaction = async (params, desc) => {
    try {
      await info.web3.eth.estimateGas(params);
      setParams({ params, desc });
      setActiveModal("confirmationModal");
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const sendTransaction = async () => {
    setActiveModal("waitingforConfirmation");
    try {
      const txHash = await provider.getSigner().sendTransaction(params.params);
      setTxHash(txHash);
      getUserBalance();
      setActiveModal("submittedModal");
      toast.promise(txHash.wait, {
        pending: "Pending transaction",
        success: "Transaction succeeded  👌",
        error: "Transaction failed 🤯",
      });
    } catch (err) {
      err = JSON.parse(JSON.stringify(err)).reason;
      setError(err);
      setActiveModal("errorModal");
    }
  };

  const getUserBalance = async () => {
    try {
      const balance = await info.web3.eth.getBalance(accounts[0]);
      setBalance(Number(info.web3.utils.fromWei(balance)).toFixed(2));
    } catch (err) {
      console.log(err);
    }
  };

  const getCost = async () => {
    const params = {
      to: info.contractJSON.address,
      data: info.contract.methods.cost().encodeABI(),
    };
    try {
      const result = await info.web3.eth.call(params);
      setMintInfo((prevState) => ({
        ...prevState,
        cost: info.web3.utils.hexToNumberString(Number(result)+ 10000000000000000),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async()=>{
    try {
      const result = await info.web3.eth.call({
        to: info.contractJSON.address,
        data: info.contract.methods.totalSupply().encodeABI(),
      });
      setMintInfo((prevState) => ({
        ...prevState,
        totalSupply: info.web3.utils.hexToNumberString(result),
      }));
    } catch (err) {
      console.log(err);
    }
  }

  const startEventListener = () => {
    const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/tK8mrIdgSeLH45dkUinsVe1VOrAudqY2'));
    const contractWS = new web3ws.eth.Contract(abi.abi, info.contractJSON.address);
      let options = {
        filter: {
          value: [],
        },
        fromBlock: 'latest',
      };
      // console.log(info.contractWS);
      info.contractWS.events.allEvents(options).on("data", async (event) => {
        let currBlock = await info.web3.eth.getBlockNumber()
        console.log(event, currBlock);
        while(event.blockNumber >= currBlock){
          currBlock = await info.web3.eth.getBlockNumber()
          console.log(event, currBlock);
        }
        console.log('after wait');
        switch (event.event) {
          case 'Transfer':
            if(event.returnValues.from === "0x0000000000000000000000000000000000000000"){
              store.dispatch(newPlayer({contract: info.contract, playerId: event.returnValues.tokenId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues.tokenId} just joined the game! 🥳`}))
              getCost();
              getTotal()
              if(isNotification) toast.info(`Player number #${event.returnValues.tokenId} just joined the game! 🥳`,{ autoClose: 3000 })
            }else{
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues.tokenId}))
              dispatch(addEvent({txt: `User ${event.returnValues.from} transferred player number #${event.returnValues.tokenId} to user ${event.returnValues.to}! 🤝`}))
              if(isNotification) toast.info(`User ${event.returnValues.from} transferred player number #${event.returnValues.tokenId} to user ${event.returnValues.to}! 🤝`,{ autoClose: 3000 })
            }
            break;
          case 'Attacked':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._eaterId}))
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._eatenId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._eaterId} attacked player number #${event.returnValues._eatenId} ! 🤯 `}))
              if(isNotification) toast.info(`User ${event.returnValues.from} transferred player number #${event.returnValues.tokenId} to user ${event.returnValues.to}! 🤝`,{ autoClose: 3000 })
              break;
          case 'AttackIncreased':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._playerId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._playerId} increased attack! 💪`}))
              if(isNotification) toast.info(`Player number #${event.returnValues._playerId} increased attack! 💪`,{ autoClose: 3000 })
              break;
          case 'ArmorIncreased':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._playerId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._playerId} increased armor! 🛡️`}))
              if(isNotification) toast.info(`Player number #${event.returnValues._playerId} increased armor! 🛡️`)
              break;
          case 'DefenseIncreased':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._playerId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._playerId} increased defense! 🦾`}))
              if(isNotification) toast.info(`Player number #${event.returnValues._playerId} increased defense! 🦾`,{ autoClose: 3000 })
              break;
          case 'StaminaIncreased':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._playerId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._playerId} increased stamina! 🏋️‍♂️`}))
              if(isNotification) toast.info(`Player number #${event.returnValues._playerId} increased stamina! 🏋️‍♂️`,{ autoClose: 3000 })
              break;
          case 'Revived':
              store.dispatch(updatePlayer({contract: info.contract, playerId: event.returnValues._playerId}))
              dispatch(addEvent({txt: `Player number #${event.returnValues._playerId} revived back into the game! 😍 😇`}))
              if(isNotification) toast.info(`Player number #${event.returnValues._playerId} revived back into the game! 😍 😇`,{ autoClose: 3000 })
              break;
          default:
            break;
        }
      });
    };
   console.log(isNotification);
  return (
    <div className="App">
      {location.pathname !== "/" && (
        <Header
          setActiveModal={setActiveModal}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          balance={balance}
          setIsNotification={setIsNotification}
          isNotification={isNotification}
        />
      )}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="map" element={<Map />} />
        <Route
          path="mint"
          element={<Mint confirmTransaction={confirmTransaction} mintInfo={mintInfo}/>}
        />
        <Route
          path="shop"
          element={<Shop confirmTransaction={confirmTransaction} />}
        />
        <Route
          path="graveyard"
          element={<Graveyard confirmTransaction={confirmTransaction} />}
        />
        <Route
          path="arena"
          element={<Arena confirmTransaction={confirmTransaction} />}
        />
        <Route path="overview" element={<Overview />} />
      </Routes>
      {location.pathname !== "/" && <Footer isDarkMode={isDarkMode} />}
        <PlayerDetails />
      {activeModal === "confirmationModal" && (
        <div className="outside-click" onClick={() => setActiveModal("")}>
          <ConfirmationModal
            params={params}
            closeFunc={() => setActiveModal("")}
            confirmFanc={sendTransaction}
          />
        </div>
      )}
      {activeModal === "waitingforConfirmation" && (
        <WaitingToConnect
          closeFunction={() => setActiveModal("")}
          header={"Waiting for confirmation"}
          subHeader={"Mint your player"}
          orangetxt={"Confirm this transaction in your wallet"}
          loadingUp={true}
        />
      )}
      {activeModal === "errorModal" && (
        <ErrorModal func={() => setActiveModal("")} error={error} />
      )}
      {activeModal === "submittedModal" && (
        <SubmittedModal func={() => setActiveModal("")} txHash={txHash} />
      )}
      {activeModal === "connectModal" && (
        <ConnectModal
          setActiveModal={setActiveModal}
          setChosenConnection={setChosenConnection}
        />
      )}
      {activeModal === "waitingToConnect" && (
        <WaitingToConnect
          closeFunction={() => setActiveModal("")}
          header={"Waiting to connect"}
          subHeader={"Confirm this connection in your wallet"}
          footer={
            "By connecting a wallet, you agree to RVT Terms of Service and acknowledge that you have read and understand the RVT Protocol Disclaimer."
          }
        />
      )}
      {activeModal === "failToConnect" && (
        <FailToConnect
          setActiveModal={setActiveModal}
          chosenConnection={chosenConnection}
        />
      )}
      <div className="toast-container">
        <ToastContainer autoClose={3000} theme='dark'/>
      </div>
    </div>
  );
}

export default App;
