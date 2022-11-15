import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import contractJSON from "./contracts/contract.json";

import "./App.css";
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

function App() {
  const [activePage, setActivePage] = useState("welcome");
  const [info, setInfo] = useState({});
  const [playersData, setPlayersData] = useState([]);
  const [params, setParams] = useState({});
  const [error, setError] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [txHash, setTxHash] = useState('');
  const [playerToShow, setPlayerToShow] = useState(null);
  const [chosenConnection, setChosenConnection] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { provider, isActive, chainId } = useWeb3React();

  // useEffect(() => {
  //   if (!isActive) setActivePage("welcome");
  // }, [isActive]);

  // useEffect(() => {
  //   init()
  // }, [chainId]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.time("checkTime");
    const request = [];
    const playersData = [];
    const web3 = new Web3(
      "https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d"
    );
    const contract = new web3.eth.Contract(
      contractJSON.abi,
      contractJSON.address
    );
    let result;
    try {
      result = await web3.eth.call({
        to: contractJSON.address,
        data: contract.methods.totalSupply().encodeABI(),
      });
    } catch (err) {
      console.log(err);
    }
    const totalSupply = web3.utils.hexToNumberString(result);
    console.log(totalSupply);
    setInfo({ web3, contract, contractJSON, totalSupply });
    for (let i = 1; i <= totalSupply; i++) {
      request.push(
        Promise.all([
          contract.methods.tokenURI(i).call(),
          contract.methods.ownerOf(i).call(),
          contract.methods.getPlayerByIndex(i).call(),
        ])
      );
    }
    let allData;
    try {
      allData = await Promise.all(request);
    } catch (err) {
      console.log(err);
    }
    console.log(allData);
    for (let i = 0; i < allData.length; i++) {
      const json = atob(allData[i][0].substring(29));
      const result = JSON.parse(json);
      playersData.push({
        image: result.image,
        player: allData[i][2],
        owner: allData[i][1],
      });
    }
    console.log(playersData);
    setPlayersData(playersData);
    console.timeEnd("checkTime");
  };

  const confirmTransaction = async (params, desc) => {
      setParams({params, desc})
      setActiveModal("confirmationModal");
  };

  const sendTransaction = async () => {
    try{
      setActiveModal("waitingToConnect");
      console.log('hi');
      const txHash = await provider.getSigner().sendTransaction(params.params);
      setTxHash(txHash)
      setActiveModal("submittedModal");
      console.log(txHash);
    }catch(err){
      err = JSON.parse(JSON.stringify(err)).reason
      console.log(err);
      setError(err)
      setActiveModal('errorModal')
    }
  };

  const afterTransaction = async (txHash)=>{
    const afterTransaction = await txHash.wait
    console.log(afterTransaction);
  }
console.log(provider);
  return (
    <div className="App">
      {activePage !== 'welcome' && <Header setActivePage={setActivePage} info={info} setActiveModal={setActiveModal} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
      {activePage === "welcome" && <Welcome setActivePage={setActivePage} />}
      {activePage === "map" && <Map setActivePage={setActivePage} />}
      {activePage === "mint" && (
        <Mint setActivePage={setActivePage} info={info} confirmTransaction={confirmTransaction} />
      )}
      {activePage === "shop" && (
        <Shop
          setActivePage={setActivePage}
          playersData={playersData.filter((player) => player.player.alive)}
          info={info}
          confirmTransaction={confirmTransaction}
        />
      )}
      {activePage === "graveyard" && (
        <Graveyard
          setActivePage={setActivePage}
          playersData={playersData.filter((player) => !player.player.alive)}
          info={info}
          confirmTransaction={confirmTransaction}
        />
      )}
      {activePage === "arena" && (
        <Arena
          setActivePage={setActivePage}
          playersData={playersData.filter((player) => player.player.alive)}
          info={info}
          confirmTransaction={confirmTransaction}
        />
      )}
      {activePage === "overview" && (
        <Overview
          setActivePage={setActivePage}
          playersData={playersData}
          info={info}
        />
      )}
      {playerToShow && <div className="outside-click" onClick={()=>setPlayerToShow(null)}><PlayerDetails setPlayerToShow={setPlayerToShow} player={playersData[0]}/></div>}
      {activeModal === 'confirmationModal' && <div className="outside-click" onClick={() => setActiveModal("")}><ConfirmationModal params={params} closeFunc={() => setActiveModal("")} info={info} confirmFanc={sendTransaction} /></div>}
      {activeModal === 'waitingToConnect' && <WaitingToConnect closeFunction={() => setActiveModal("")}
          header={"Waiting for confirmation"}
          subHeader={"Mint your player"}
          orangetxt={"Confirm this transaction in your wallet"}
          loadingUp={true}/>}
      {activeModal === 'errorModal' && <ErrorModal func={() => setActiveModal("")} error={error}/>}
      {activeModal === 'submittedModal' && <SubmittedModal func={() => setActiveModal("")} txHash={txHash}/>}
      {activeModal === 'connectModal' && <ConnectModal setActiveModal={setActiveModal} setChosenConnection={setChosenConnection}/>}
      {activeModal === 'waitingToConnect' && <WaitingToConnect closeFunction={()=>setActiveModal('')} header={'Waiting to connect'} subHeader={'Confirm this connection in your wallet'} footer={'By connecting a wallet, you agree to Mverse Terms of Service and acknowledge that you have read and understand the Mverse Protocol Disclaimer.'}/>}
      {activeModal === 'failToConnect' && <FailToConnect setActiveModal={setActiveModal} chosenConnection={chosenConnection}/>}
      {activePage !== 'welcome' && <Footer setActivePage={setActivePage} isDarkMode={isDarkMode}/>}
    </div>
  );
}

export default App;
