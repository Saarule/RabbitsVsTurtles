import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audio: true,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent(state, action) {
      state.events.unshift(action.payload)
    },
  },
});

export const selectAllEvents = (state) => state.events.events;

export const {addEvent} = eventsSlice.actions

export default eventsSlice.reducer;
