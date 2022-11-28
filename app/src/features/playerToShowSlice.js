import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  player: null
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playerUpdate(state, action) {
        state.player = action.payload;
    },
    removePlayer(state, action) {
        state.player = null;
    },
  },
});

export const selectAllplayer = (state) => state.player.player;

export const {playerUpdate, removePlayer} = playerSlice.actions

export default playerSlice.reducer;