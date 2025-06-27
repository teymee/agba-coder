import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStore } from "../features/Dashboard/dashboardSlice";
import {
  getGoals,
  getInsight,
  getStatsAggregated,
  getStatSummaries,
  getStatusBar,
  getUserDetails,
} from "../features/Dashboard/dashboardAPI";
import Header from "../features/Dashboard/components/Header";

export default function Dashboard() {
  // console.log(getLocalStorage("tokenDetails"));
  const dispatch = useDispatch();
  const { statsAgg } = useSelector(getDashboardStore);

  useEffect(() => {
    dispatch(getStatsAggregated());
    dispatch(getStatSummaries());
    dispatch(getStatusBar());
    dispatch(getGoals());
    dispatch(getUserDetails())
    dispatch(getInsight())
  }, [dispatch]);

  return (
    <>
      <main>
        {statsAgg.isLoading && <p>Loading...</p>}

        {!statsAgg.isLoading && (
          <>
            <Header />
          </>
        )}
      </main>
    </>
  );
}
