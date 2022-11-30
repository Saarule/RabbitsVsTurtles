import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connector: 'Network',
};

const connectorSlice = createSlice({
  name: "connector",
  initialState,
  reducers: {
    updateConnector(state, action) {
      state.connector = action.payload
    },
  },
});

export const selectAllConnector = (state) => state.connector.connector;

export const {updateConnector} = connectorSlice.actions

export default connectorSlice.reducer;
