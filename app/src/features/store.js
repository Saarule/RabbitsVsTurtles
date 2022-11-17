import { configureStore } from "@reduxjs/toolkit";

import playersReducer from './playersSlice'
import infoReducer from './infoSlice'

export const store = configureStore({
    reducer: {
        players: playersReducer,
        info: infoReducer
    }
})