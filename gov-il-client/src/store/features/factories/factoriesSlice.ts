import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"



type FactoriesState = {
    factoriesForSale: any[]
}

const initialState: FactoriesState = {
    factoriesForSale: []
}

const factoriesSlice = createSlice({
    name: "factories",
    initialState,
    reducers: {
        saleFactory: (state: FactoriesState, action: PayloadAction<any>) => {
            state.factoriesForSale.push(1)
        },

    }
})


export default factoriesSlice.reducer 