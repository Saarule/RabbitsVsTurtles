import React from "react";
import ReactDOM from "react-dom";
import Minter from "./components/Minter";
import "./styles/styles.css";
import { AlertContainer} from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; // css for alerts


ReactDOM.render(
  <React.StrictMode>
    <Minter />
    <AlertContainer floatingTime={7000} />
  </React.StrictMode>,
  document.getElementById("root")
);
