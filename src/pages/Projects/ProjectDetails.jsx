import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStatSummaries } from "../../features/Dashboard/dashboardAPI";
import { getDashboardStore } from "../../features/Dashboard/dashboardSlice";
import { Chart } from "primereact/chart";
import { ProgressBar } from "primereact/progressbar";

import { Progress, Tooltip } from "antd";
import { timeConverstion, truncateString } from "../../utils/generalUtils";

export default function ProjectDetails() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { summaries: { data: projectDetails, isLoading } = {} } =
    useSelector(getDashboardStore);

  //   console.log(projectDetails, "projectDetails");
  const {
    cumulative_total,
    daily_average,
    data: weeklyData,
  } = projectDetails || {};
  useEffect(() => {
    name && dispatch(getStatSummaries({ project: name }));
  }, [name, dispatch]);

  const barData = {
    labels: weeklyData?.map((item) => item?.range?.text) || [],
    datasets: [
      {
        label: "Weekly Activity",
        data:
          weeklyData?.map((item) => item?.grand_total?.total_seconds / 3600) ||
          [],
        backgroundColor: [
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 1,
      },
    ],
  };

  let donutData;

  //   LANGGUAGE
  if (weeklyData?.length > 0) {
    let testLang = {};

    weeklyData?.map((item) => {
      item?.languages?.forEach((lang) => {
        const { name, total_seconds } = lang || {};
        let pushedLang = testLang?.[name];
        let hoursConversion = total_seconds / 3600;
        if (pushedLang) {
          testLang[name] = {
            name: name,
            hours: pushedLang.hours + hoursConversion,
          };
        } else {
          testLang[name] = {
            name: name,
            hours: hoursConversion,
          };
        }
      });
    });

    let totalLangSpent = Object.values(testLang);

    donutData = {
      labels: totalLangSpent?.map((item) => item?.name) || [],
      datasets: [
        {
          label: "Language Contribution",
          data:
            totalLangSpent?.map((item) => Number(item?.hours?.toFixed(2))) ||
            [],
          backgroundColor: [
            "rgba(255, 159, 64)",
            "rgba(75, 192, 192)",
            "rgba(54, 162, 235)",
            "rgba(54, 62, 235)",
            "rgba(104, 162, 235)",
            "rgba(104, 162, 205)",
          ],
          hoverBackgroundColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
          ],
        },
      ],
    };
  }

  //   DEPENDENCIES
  let topDependencies = [];
  if (weeklyData?.length > 0) {
    let testDepend = {};

    weeklyData?.map((item) => {
      item?.dependencies?.forEach((lang) => {
        const { name, total_seconds } = lang || {};
        let pushedLang = testDepend?.[name];
        let hoursConversion = total_seconds / 3600;
        if (pushedLang) {
          testDepend[name] = {
            name: name,
            hours: pushedLang.hours + hoursConversion,
          };
        } else {
          testDepend[name] = {
            name: name,
            hours: hoursConversion,
          };
        }
      });
    });

    let totalDependSpent = Object.values(testDepend)?.sort((a, b) =>
      a.hours < b.hours ? 1 : -1
    );
    const totalDependHours = totalDependSpent?.reduce(
      (acc, item) => acc + item?.hours,
      0
    );
    let topDepend = totalDependSpent?.slice(0, 9);
    let otherDependArr = totalDependSpent?.slice(
      9,
      totalDependSpent?.length - 1
    );
    topDepend.push({
      name: "Others",
      hours: otherDependArr?.reduce((acc, item) => acc + item?.hours, 0),
    });

    const finalTopDepend = topDepend
      ?.sort((a, b) => (a.hours < b.hours ? 1 : -1))
      ?.map((item) => {
        const { name, hours } = item || {};
        return {
          name,
          hours: Number(hours?.toFixed(2)),
          percent: Number(((hours / totalDependHours) * 100).toFixed(2)),
        };
      });

    topDependencies = finalTopDepend;

    // console.log(finalTopDepend, totalDependHours, "totalDependSpent");
  }

  // FILES
  let topFilesOpened = [];
  if (weeklyData?.length > 0) {
    let testFiles = {};

    weeklyData?.map((item) => {
      item?.entities?.forEach((lang) => {
        const { name, total_seconds, type } = lang || {};
        let pushedLang = testFiles?.[name];
        let hoursConversion = total_seconds / 3600;
        if (pushedLang) {
          testFiles[name] = {
            name: name,
            hours: pushedLang.hours + hoursConversion,
            type,
          };
        } else {
          testFiles[name] = {
            name: name,
            hours: hoursConversion,
            type,
          };
        }
      });
    });

    let totalFilesSpent = Object.values(testFiles)?.sort((a, b) =>
      a.hours < b.hours ? 1 : -1
    );
    const totalDependHours = totalFilesSpent?.reduce(
      (acc, item) => acc + item?.hours,
      0
    );
    let topFiles = totalFilesSpent?.slice(0, 19);
    let otherFilesArr = totalFilesSpent?.slice(20, totalFilesSpent?.length - 1);
    topFiles.push({
      name: "Others",
      hours: otherFilesArr?.reduce((acc, item) => acc + item?.hours, 0),
    });

    const finalTopFiles = topFiles
      ?.sort((a, b) => (a.hours < b.hours ? 1 : -1))
      ?.map((item) => {
        const { name, hours } = item || {};
        return {
          name,
          hours: Number(hours?.toFixed(2)),
          percent: Number(((hours / totalDependHours) * 100).toFixed(2)),
        };
      });

    topFilesOpened = finalTopFiles;

    console.log(topFilesOpened, "totalFilesSpent");
  }

  return (
    <section>
      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <section>
          <h1>{name}</h1>
          <div>
            <h1>Total time spent: {cumulative_total?.text} </h1>
            <h1>
              Daily average time spent :{" "}
              {daily_average?.text_including_other_language}
            </h1>

            {/* 🚨GRAPHS  */}
            <section className="flex gap-x-10 text-center">
              <h1>GRAPHS </h1>
              {/* 🚨Bar chart  */}
              <div className="w-[50%] my-10 border">
                <h1> Contributions to the project in the last 7 days</h1>
                <Chart type="bar" data={barData} />
              </div>
              {/* 🚨Pie chart  */}
              <div>
                <h1> Contributions to the project in the last 7 days</h1>
                <Chart type="doughnut" data={donutData} />
              </div>
            </section>

            {/* 🚨 TOP DEPENDENDCIES  */}
            <section className="w-1/2 border p-5">
              <h1>Top dependencies</h1>
              <section className="space-y-5 my-4">
                {topDependencies?.length > 0 &&
                  topDependencies?.map((item) => {
                    const { name, hours, percent } = item || {};
                    return (
                      <div key={name}>
                        <div className="flex justify-between">
                          <div>
                            <p>{name}</p>
                          </div>

                          <p> {timeConverstion(hours)}</p>
                        </div>
                        <div>
                          <ProgressBar value={percent} />
                        </div>
                      </div>
                    );
                  })}
              </section>
            </section>

            {/* 🚨 TOP FILES  */}
            <section className="bg-white text-black p-5 flex flex-wrap gap-x-4  gap-y-8">
              {topFilesOpened?.length > 0 &&
                topFilesOpened?.map((item, index) => {
                  const { name, hours, percent } = item || {};
                  return (
                    <div key={name} className="flex gap-x-4">
                      <p>{++index}</p>
                      <div>
                        <Tooltip title={name}>
                          <p className="cursor-pointer">
                            {truncateString(name, 25, true)}
                          </p>
                        </Tooltip>

                        <p>{timeConverstion(hours)} </p>
                      </div>

                      <Progress
                        type="circle"
                        percent={percent}
                        size={50}
                        format={() => {
                          return (
                            <div>
                              <p>{percent}%</p>
                            </div>
                          );
                        }}
                      />
                    </div>
                  );
                })}
              {/* <Progress
                type="circle"
                percent={75}
                size={80}
                format={() => {
                  return (
                    <div>
                      <p>80%</p>
                      <p className="text-sm">2 hours</p>
                    </div>
                  );
                }}
              /> */}
            </section>
          </div>
        </section>
      )}
    </section>
  );
}
