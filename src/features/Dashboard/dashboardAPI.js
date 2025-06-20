import { createAsyncThunk } from "@reduxjs/toolkit";

import axiosInstance from "@/utils/axiosInterceptor";
import { APIs } from "../../../api";

//THUNKS
export const getStatsAggregated = createAsyncThunk(
  "dashboard/getStatsAggregated",
  async () => {
    const response = await axiosInstance.get(APIs.statsAggregated);
    return response?.data;
  }
);

export const getStatSummaries = createAsyncThunk(
  "dashboard/getStatSummaries",
  async (paramList) => {
    const params = {
      ...paramList,
      range: "last_7_days" 
    }
    const response = await axiosInstance.get(APIs.statSummary, { params });
    return response?.data;
  }
);

export const getStatusBar = createAsyncThunk(
  "dashboard/getStatusBar",
  async () => {
    const response = await axiosInstance.get(APIs.statusBar);
    return response?.data;
  }
);
