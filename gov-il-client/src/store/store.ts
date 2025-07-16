import { configureStore } from "@reduxjs/toolkit";
import carsReducers from "./features/cars/carSlice"

export const store = configureStore({
    reducer: {
        cars: carsReducers
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

