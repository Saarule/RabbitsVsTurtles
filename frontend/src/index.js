import React from "react";
import ReactDOM from "react-dom";
import Minter from "./components/Minter";
import "./styles/styles.css";
import { AlertContainer} from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; // css for alerts
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3"; 
import { connectors } from "./components/connectors";

const getLibrary = (provider) => {
  const library = new Web3(provider);
  // library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
    <Minter />
    <AlertContainer floatingTime={7000} />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
