import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

import contractJSON from "./contracts/contract.json"

import "./App.css";
import Welcome from "./pages/Welcome/Welcome";
import Map from "./pages/Map/Map";
import Header from "./components/Header/Header2";
import Mint from "./pages/Mint/Mint";
import Shop from "./pages/Shop/Shop";
import Footer from "./components/Footer/Footer";

function App() {
  const [activePage, setActivePage] = useState("welcome");
  const [info, setInfo] = useState({});
  const [isNotification, setIsNotification] = useState(false);

  const {
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ENSNames,
    connector,
  } = useWeb3React();

  useEffect(() => {
    if (!isActive) setActivePage("welcome");
  }, [isActive]);

  useEffect(() => {
    init()
  }, [chainId]);

  const init = () => {
    const web3 = new Web3('https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d');
    const contract = new web3.eth.Contract(contractJSON.abi, contractJSON.address);
    setInfo({web3, contract, contractJSON})
  };

  const changePage = (pageName) => {
    switch (pageName) {
      case "welcome":
        setActivePage("welcome");
        break;
      case "map":
        setActivePage("map");
        break;
      default:
        setActivePage("welcome");
    }
  };
  console.log(activePage);
  return (
    <div className="App">
      {isActive && <Header setActivePage={setActivePage}/>}
      {activePage === "welcome" && <Welcome setActivePage={setActivePage} />}
      {activePage === "map" && <Map setActivePage={setActivePage} />}
      {activePage === "mint" && <Mint setActivePage={setActivePage} info={info}/>}
      {activePage === "shop" && <Shop setActivePage={setActivePage}/>}
      {isActive && <Footer setActivePage={setActivePage}/>}
    </div>
  );
}

export default App;
