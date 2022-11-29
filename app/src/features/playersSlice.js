import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import Web3 from "web3";
import contractJSON from "../contracts/contract.json";
import abi from "../contracts/abi.json";
import { CHAINS } from "../connectors/chains";

const playersAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = playersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPlayers = createAsyncThunk(
  "fetchPlayers",
  async (chainId) => {
    console.time("checkTime");
    // console.log(CHAINS[chainId].urls, CHAINS[chainId].contractAddress);
    const request = [];
    const playersData = [];
    const web3 = new Web3(CHAINS[chainId].urls[0]);
    const contract = new web3.eth.Contract(
      abi.abi,
      contractJSON.address[chainId]
    );
    let result;
    try {
      console.log("hi");
      result = await web3.eth.call({
        to: CHAINS[chainId].contractAddress,
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
        id: allData[i][2].name.split("#")[1],
        image: result.image,
        player: allData[i][2],
        owner: allData[i][1],
      });
    }
    console.timeEnd("checkTime");
    console.log(playersData);
    return playersData;
  }
);

export const newPlayer = createAsyncThunk(
  "newPlayer",
  async (contract, playerId) => {
    const newPlayer = await Promise.all([
      contract.methods.tokenURI(playerId).call(),
      contract.methods.ownerOf(playerId).call(),
      contract.methods.getPlayerByIndex(playerId).call(),
    ]);
    const json = atob(newPlayer[0].substring(29));
    const result = JSON.parse(json);
    const newPlayerData = {
      id: newPlayer[2].name.split("#")[1],
      image: result.image,
      player: newPlayer[2],
      owner: newPlayer[1],
    };
    console.log(newPlayerData);
    return newPlayerData;
  }
);

export const updatePlayer = createAsyncThunk("updatePlayer", async (info) => {
  const { playerId, contract } = info;
  console.log(playerId, contract);
  const newPlayer = await Promise.all([
    contract.methods.tokenURI(playerId).call(),
    contract.methods.ownerOf(playerId).call(),
    contract.methods.getPlayerByIndex(playerId).call(),
  ]);
  const json = atob(newPlayer[0].substring(29));
  const result = JSON.parse(json);
  const newPlayerData = {
    id: newPlayer[2].name.split("#")[1],
    image: result.image,
    player: newPlayer[2],
    owner: newPlayer[1],
  };
  console.log(newPlayerData);
  return newPlayerData;
});

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    removeAllPlayers(state, action) {
      playersAdapter.removeAll(state)
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPlayers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        playersAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(newPlayer.fulfilled, (state, action) => {
        playersAdapter.addOne(state, action.payload);
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        playersAdapter.upsertOne(state, action.payload);
      });
  },
});

export const { selectAll: selectAllPlayers, selectIds: selectPlayerIds } =
  playersAdapter.getSelectors((state) => state.players);

export const { selectById: selectPlayerById } = playersAdapter.getSelectors();
export const {removeAllPlayers} = playersSlice.actions

export const getPlayersStatus = (state) => state.players.status;
export const getPlayersError = (state) => state.players.error;

export default playersSlice.reducer;
