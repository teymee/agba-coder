import { createSlice } from "@reduxjs/toolkit";
import { getProjects } from "./projectAPI";

const initialState = {
  projectList: {
    data: null,
    isLoading: false,
  },
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  extraReducers: (builder) => {
    // 🚨 PROJECT LIST
    builder
      .addCase(getProjects.pending, (state) => {
        state.projectList.isLoading = true;
      })
      .addCase(getProjects.fulfilled, (state, { payload }) => {
        state.projectList.data = payload;

        state.projectList.isLoading = false;
      });
  },
});

const projectReducer = projectSlice.reducer;
export const getProjectStore = (state) => state.project;
export default projectReducer;
