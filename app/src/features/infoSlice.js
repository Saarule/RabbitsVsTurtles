import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";
import abi from '../contracts/abi.json'
import { CHAINS } from "../connectors/chains";
import { CHAINSSOCKET } from "../connectors/chains";
import { useDispatch } from "react-redux";
import { useWeb3React } from "@web3-react/core";


const web3 = new Web3(
  "https://polygon-mainnet.infura.io/v3/9b81098f432a446690d089d65bc3deb9"
  );
  
  const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/tK8mrIdgSeLH45dkUinsVe1VOrAudqY2'));
  
  const contract = new web3.eth.Contract(abi.abi, CHAINS[5].contractAddress);
  const contractWS = new web3ws.eth.Contract(abi.abi, CHAINS[5].contractAddress);

const initialState = {
  info: {
    web3,
    contract,
    contractWS,
    contractJSON: {address: CHAINS[5].contractAddress},
  }
};

export const fetchInfo = createAsyncThunk('fetchInfo', async (chainId) => {
  const web3 = new Web3(CHAINS[chainId]);
  const web3ws = new Web3(new Web3.providers.WebsocketProvider(CHAINS[chainId].WSurl));
  const contract = new web3.eth.Contract(abi.abi, CHAINS[chainId].contractAddress);
  const contractWS = new web3ws.eth.Contract(abi.abi, CHAINS[chainId].contractAddress);
  
  const info = {
    web3,
    contract,
    contractWS,
    contractJSON: {address: CHAINS[chainId].contractAddress}
  }
  console.log(info);
  return info
})

const infoSlice = createSlice({
  name: "info",
  initialState,
  reducers: {
    updateInfo(state, action) {
    state.info = action.payload
  },
},
  extraReducers(builder) {
    builder
      .addCase(fetchInfo, (state, action) => {
        console.log(action.payload);
        state.info = action.payload;
      })
    }
});

export const selectAllInfo = (state) => state.info.info;

export const {updateInfo} = infoSlice.actions

export default infoSlice.reducer;
