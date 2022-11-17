import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";


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
  const [params, setParams] = useState({});
  const [error, setError] = useState({});
  const [activeModal, setActiveModal] = useState("");
  const [txHash, setTxHash] = useState("");
  const [playerToShow, setPlayerToShow] = useState(null);
  const [chosenConnection, setChosenConnection] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { provider, isActive, chainId, connector } = useWeb3React();
  const location = useLocation()

  

  const confirmTransaction = async (params, desc) => {
    setParams({ params, desc });
    setActiveModal("confirmationModal");
  };

  const sendTransaction = async () => {
    setActiveModal("waitingToConnect");
    try {
      console.log("hi");
      const txHash = await provider.getSigner().sendTransaction(params.params);
      setTxHash(txHash);
      setActiveModal("submittedModal");
      console.log(txHash);
    } catch (err) {
      err = JSON.parse(JSON.stringify(err)).reason;
      console.log(err);
      setError(err);
      setActiveModal("errorModal");
    }
  };

  const afterTransaction = async (txHash) => {
    console.log(txHash.wait);
    const afterTransaction = await txHash.wait;
    console.log(afterTransaction);
  };
 
  return (
    // <BrowserRouter>
      <div className="App">
        {location.pathname !== "/" && (
          <Header
            setActiveModal={setActiveModal}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        )}
        <Routes>

        <Route path="/" element={<Welcome/>}/>
        <Route path="map" element={<Map/>}/>
        <Route path="mint" element={<Mint
          confirmTransaction={confirmTransaction}
          />}/>
        <Route path="shop" element={<Shop
          confirmTransaction={confirmTransaction}
          />}/>
        <Route path="graveyard" element={<Graveyard
          confirmTransaction={confirmTransaction}
        />}/>
        <Route path="arena" element={<Arena
          confirmTransaction={confirmTransaction}
          />}/>
        <Route path="overview" element={<Overview
          />}/>
        </Routes>
        {playerToShow && (
          <div className="outside-click" onClick={() => setPlayerToShow(null)}>
            <PlayerDetails/>
          </div>
        )}
        {activeModal === "confirmationModal" && (
          <div className="outside-click" onClick={() => setActiveModal("")}>
            <ConfirmationModal
              params={params}
              closeFunc={() => setActiveModal("")}
              confirmFanc={()=>{
                setActiveModal('waitingToConnect')
                console.log('set active modal');
                sendTransaction()}}
            />
          </div>
        )}
        {activeModal === "waitingToConnect" && (
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
              "By connecting a wallet, you agree to Mverse Terms of Service and acknowledge that you have read and understand the Mverse Protocol Disclaimer."
            }
          />
        )}
        {activeModal === "failToConnect" && (
          <FailToConnect
            setActiveModal={setActiveModal}
            chosenConnection={chosenConnection}
          />
        )}
        {location.pathname !== "/" && (
          <Footer isDarkMode={isDarkMode} />
        )}
      </div>
    // </BrowserRouter>
  );
}

export default App;
