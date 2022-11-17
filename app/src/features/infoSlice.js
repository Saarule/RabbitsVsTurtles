import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";

const web3 = new Web3(
  "https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d"
);
const contract = new web3.eth.Contract(contractJSON.abi, contractJSON.address);

const initialState = {
  info: {
    web3,
    contract,
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
