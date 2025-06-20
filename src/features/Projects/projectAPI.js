import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIs } from "../../../api";
import axiosInstance from "@/utils/axiosInterceptor";

export const getProjects = createAsyncThunk("project/getProjects", async () => {
  const response = await axiosInstance.get(APIs.projectList);
  return response?.data;
});



export const getProjectCommits = createAsyncThunk(
  "project/getProjectCommits",
  async (projectId) => {
    const response = await axiosInstance.get(APIs.commitList.base, {params:{projectId}});
    return response?.data;
  }
);
