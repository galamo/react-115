import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import { getCarApi, type CarClient } from "../../../components/pages/carsPage/service/getCarApi";



type CarsState = {
    favorites: CarClient[],
    carsForSale: number[],
    isLoading: boolean,
    globalCar: CarClient | null,
    error: string | null
}

const initialState: CarsState = {
    favorites: [],
    carsForSale: [],
    isLoading: false,
    globalCar: null,
    error: null
}


export const getCarByLP = createAsyncThunk(
    'cars/getCar',
    async (lp: string) => {
        const response = await getCarApi(lp)
        return response
    },
)


const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        addToFavorites: (state: CarsState, action: PayloadAction<CarClient>) => {
            // check duplication, validation
            console.log("???")
            state.favorites.push(action.payload)
        },
        removeFromFavorites: (state: CarsState, action: PayloadAction<{ lp: number }>) => {
            state.favorites = state.favorites.filter(c => c.lp !== action.payload.lp)
        },
        addCarsForSale: (state: CarsState, action: PayloadAction<{ lp: number }>) => {
            state.carsForSale.push(action.payload.lp)
        }
    }, extraReducers(builder) {
        builder.addCase(getCarByLP.pending, (state: CarsState) => {
            state.isLoading = false
            state.error = null
        }).addCase(getCarByLP.fulfilled, (state: CarsState, action: PayloadAction<CarClient>) => {
            state.globalCar = action.payload
            state.isLoading = false
            console.log("CAR RETURN FROM API")
        }).addCase(getCarByLP.rejected, (state: CarsState) => {
            state.isLoading = false
            state.error = "Error Getting Car"
        })
    },
})

export const { addToFavorites, removeFromFavorites, addCarsForSale } = carSlice.actions

export default carSlice.reducer 