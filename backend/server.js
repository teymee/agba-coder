import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";
import { APIs } from "../api/index.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:7000", // Replace with your React frontend origin
    credentials: true, // Allow cookies and Authorization headers
  })
);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT;
// eslint-disable-next-line no-undef
const BASE_URL = process.env.BASE_URL;

// Reusable function to call WakaTime API
const proxyDomain = async (req, endpoint) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(`${BASE_URL}/${endpoint}`, "mmm");
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
    },
  });

  const data = await res.json(); // parse the response body

  if (!res.ok) {
    // Pass actual error message and status from Wakatime
    const error = new Error(data?.error || "WakaTime API error");
    error.status = res.status;
    error.details = data;
    throw error;
  }

  return data;
};

const handleError = (res, err) => {
  console.error("WakaTime error:", err.details || err.message);
  return res.status(err.status || 500).json({
    error: err.message,
    details: err.details || null,
  });
};
// ENDPOINTS

//🚨 DASHBOARD
app.get(APIs.statsAggregated, async (req, res) => {
  try {
    const data = await proxyDomain(req, APIs.statsAggregated);
    res.json(data);
  } catch (err) {
    console.error("WakaTime error:", err.details || err.message);
    res.status(err.status || 500).json({
      error: err.message,
      details: err.details || null,
    });
  }
});

app.get(APIs.statSummary, async (req, res) => {
  try {
    const data = await proxyDomain(
      req,
      `${APIs.statSummary}?range=last_7_days`
    );
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

app.get(APIs.statusBar, async (req, res) => {
  try {
    const data = await proxyDomain(req, `${APIs.statusBar}`);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// 🚨 PROJECTS
app.get(APIs.projectList, async (req, res) => {
  try {
    const data = await proxyDomain(req, `${APIs.projectList}`);
    res.json(data);
  } catch (err) {
    handleError(res, err);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API Server running at http://localhost:${PORT}`);
});
