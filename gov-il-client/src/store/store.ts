import { configureStore } from "@reduxjs/toolkit";
import carsReducers from "./features/cars/carSlice"
import factoriesReducers from "./features/factories/factoriesSlice"

import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        cars: carsReducers,
        f: factoriesReducers
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()