import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builders) => {
    builders.addCase();
  },
});

const statisticsReducer = statisticsSlice.reducer;
export default statisticsReducer;
