import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  getCarApi,
  type CarClient,
} from "../../../components/pages/carsPage/service/getCarApi";
import axios from "axios";

const dummyData = {
  username: "na@gmail.com",
  permissions: { flights: ["read"], cars: ["read"] },
};
type ServerUserDetails = typeof dummyData;
type UserDetails = { details: ServerUserDetails } & { isLoading: boolean }; // I AM LAZY

const initialState: UserDetails = {
  details: {
    username: "",
    permissions: {
      flights: [],
      cars: [],
    },
  },
  isLoading: false,
};

const apiUrl = "http://localhost:2200/user-details";

export const getUserDetails = createAsyncThunk("cars/getCar", async () => {
  const response = await axios.get<UserDetails>(apiUrl);
  console.log(response.data, "fromapi");
  return response.data;
});

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserDetails.pending, (state: UserDetails) => {
        state.isLoading = false;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state: UserDetails, action: PayloadAction<any>) => {
          // the issue was around the types
          // need to declare the type
          // no {details key inside the server response}

          state.details = action.payload;
        }
      )
      .addCase(getUserDetails.rejected, (state: UserDetails) => {
        state.isLoading = false;
      });
  },
});

export default userDetailsSlice.reducer;
