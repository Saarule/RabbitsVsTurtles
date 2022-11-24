import { configureStore } from "@reduxjs/toolkit";

import playersReducer from './playersSlice'
import infoReducer from './infoSlice'
import pastEventsReducer from './pastEventsSlice'
import playerReducer from './playerToShowSlice'
import eventsRducer from './eventsSlice'

export const store = configureStore({
    reducer: {
        players: playersReducer,
        info: infoReducer,
        pastEvents: pastEventsReducer,
        player: playerReducer,
        events: eventsRducer
    }
})