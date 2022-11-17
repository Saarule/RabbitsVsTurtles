import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";
import abi from '../contracts/abi.json'


const initialState = {
    players: [],
    status: 'idle',
    error: null
}

export const fetchPlayers = createAsyncThunk('fetchPlayers', async (chainId) => {
        console.time("checkTime");
        const request = [];
        const playersData = [];
        const web3 = new Web3(
          "https://polygon-mainnet.infura.io/v3/0d9bcb9c917745aeb37f0cb0283b203d"
        );
        const contract = new web3.eth.Contract(
          abi.abi,
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
        for (let i = 0; i < allData.length; i++) {
          const json = atob(allData[i][0].substring(29));
          const result = JSON.parse(json);
          playersData.push({
            image: result.image,
            player: allData[i][2],
            owner: allData[i][1],
          });
        }
        console.timeEnd("checkTime");
    
    return playersData
})

const playersSlice = createSlice({
    name: 'players',
    initialState,
    reducers:{},
    extraReducers(builder){
        builder
        .addCase(fetchPlayers.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPlayers.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.players = state.players.concat(action.payload)
        })
        .addCase(fetchPlayers.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }

})

export const selectAllPlayers = (state) => state.players.players;
export const getPlayersStatus = (state) => state.players.status;
export const getPlayersError = (state) => state.players.error;

export default playersSlice.reducer