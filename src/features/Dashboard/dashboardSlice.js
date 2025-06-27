import { createSlice } from "@reduxjs/toolkit";
import {
  getGoals,
  getInsight,
  getStatsAggregated,
  getStatSummaries,
  getStatusBar,
  getUserDetails,
} from "./dashboardAPI";

const initialState = {
  statsAgg: {
    data: null,
    isLoading: false,
  },
  summaries: {
    data: null,
    isLoading: false,
  },
  statusBar: {
    data: null,
    isLoading: false,
  },

  goals: {
    data: null,
    isLoading: false,
  },
  userDetails: {
    data: null,
    isLoading: false,
  },

  insight: {
    data: null,
    isLoading: false,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🚨 ALL TIME SINCE
    builder
      .addCase(getStatsAggregated.pending, (state) => {
        state.statsAgg.isLoading = true;
      })
      .addCase(getStatsAggregated.fulfilled, (state, { payload }) => {
        state.statsAgg.data = payload;

        state.statsAgg.isLoading = false;
      });

    // 🚨 STAT SUMMARIES
    builder
      .addCase(getStatSummaries.pending, (state) => {
        state.summaries.isLoading = true;
      })
      .addCase(getStatSummaries.fulfilled, (state, { payload }) => {
        state.summaries.data = payload;
        state.summaries.isLoading = false;
      });

    // 🚨 STATUS BAR
    builder
      .addCase(getStatusBar.pending, (state) => {
        state.statusBar.isLoading = true;
      })
      .addCase(getStatusBar.fulfilled, (state, { payload }) => {
        state.statusBar.data = payload;
        state.statusBar.isLoading = false;
      });

    // 🚨 STATUS BAR
    builder
      .addCase(getGoals.pending, (state) => {
        state.goals.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, { payload }) => {
        state.goals.data = payload;
        state.goals.isLoading = false;
      });

    // 🚨 USER
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.userDetails.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.userDetails.data = payload;
        state.userDetails.isLoading = false;
      });

    // 🚨INSIGHT
    builder
      .addCase(getInsight.pending, (state) => {
        state.insight.isLoading = true;
      })
      .addCase(getInsight.fulfilled, (state, { payload }) => {
        state.insight.data = payload;
        state.insight.isLoading = false;
      });
  },
});

const dashboardReducer = dashboardSlice.reducer;
export const getDashboardStore = (state) => state.dashboard;
export default dashboardReducer;
