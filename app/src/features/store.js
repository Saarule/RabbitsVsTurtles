import { configureStore } from "@reduxjs/toolkit";

import playersReducer from './playersSlice'
import infoReducer from './infoSlice'
import pastEventsReducer from './pastEventsSlice'

export const store = configureStore({
    reducer: {
        players: playersReducer,
        info: infoReducer,
        pastEvents: pastEventsReducer
    }
})