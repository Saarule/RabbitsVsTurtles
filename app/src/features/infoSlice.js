import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";
import abi from '../contracts/abi.json'

const web3 = new Web3(
  "https://polygon-mainnet.infura.io/v3/9b81098f432a446690d089d65bc3deb9"
);

const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/tK8mrIdgSeLH45dkUinsVe1VOrAudqY2'));

const contract = new web3.eth.Contract(abi.abi, contractJSON.address);
const contractWS = new web3ws.eth.Contract(abi.abi, contractJSON.address);

const initialState = {
  info: {
    web3,
    contract,
    contractWS,
    contractJSON,
  }
};

// export const fetchInfo = createAsyncThunk('fetchInfo', async (chainId) => {
//   const info = {
//     web3,
//     contract: new web3.eth.Contract(contractJSON.abi, contractJSON.address),
//     contractJSON,
//   }
//   return info
// })

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {},
});

export const selectAllInfo = (state) => state.info.info;

export default infoSlice.reducer;
