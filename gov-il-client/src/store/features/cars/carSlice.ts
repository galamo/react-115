import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import type { CarClient } from "../../../components/pages/carsPage/service/getCarApi";



type CarsState = {
    favorites: CarClient[]
}

const initialState: CarsState = {
    favorites: []
}

const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        addToFavorites: (state: CarsState, action: PayloadAction<CarClient>) => {
            // check duplication, validation
            state.favorites.push(action.payload)
        }
    }
})

const { addToFavorites } = carSlice.actions
export { addToFavorites }
export default carSlice.reducer 