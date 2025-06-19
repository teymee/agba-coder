import { configureStore } from "@reduxjs/toolkit";

//REDUCERS
import dashboardReducer from "../features/Dashboard/dashboardSlice";
import projectReducer from "../features/Projects/projectSlice";

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    project: projectReducer,
  },
});
