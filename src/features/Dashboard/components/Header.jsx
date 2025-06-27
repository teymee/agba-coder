import { useRef } from "react";

// STORE
import { useSelector } from "react-redux";
import { getDashboardStore } from "../dashboardSlice";

// GSAP
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";

// LIB
import { Chart } from "primereact/chart";
import { formatTime, truncateString } from "../../../utils/generalUtils";
import { Tooltip } from "antd";

export default function Header() {
  const firstRow = useRef(null);
  // const secondRow = useRef(null);
  const {
    statsAgg,
    summaries,
    statusBar,
    goals: { data: goalsData },
    // userDetails: { data: userData },
    insight: { data: insightData },
  } = useSelector(getDashboardStore);

  // 🚨User data
  // const { photo, email, full_name } = userData ?? {};

  // 🚨 insight store

  const insightGraph = {
    labels: insightData?.weekdays?.map((item) => item?.name),
    datasets: [
      {
        label: "Weekly duration last year",
        data: insightData?.weekdays?.map((item) => item?.total / 3600),

        fill: {
          target: "origin",
          above: " #9f67ff30",
        },
        tension: 0.4,

        borderColor: ["#9f67ff90"],

        borderWidth: 2,
      },
    ],
  };

  const insightOptions = {
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const value = tooltipItem.raw.toFixed(2);
            return `Time: ${formatTime(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
    },
  };
  // 🚨 goals store

  const firstGoal = goalsData?.data?.[0];
  const { cumulative_status, ignore_days, title } = firstGoal ?? {};

  const goalGraph = {
    labels: firstGoal?.chart_data?.map((item) => item?.range?.text),
    datasets: [
      {
        type: "line",
        label: "Goal (3 hrs)",
        borderColor: "#1e88e5",
        borderWidth: 2,
        fill: false,
        data: [3, 3, 3, 3, 3, 3, 3],
        tension: 0.4,
        pointRadius: 3,
        pointBackgroundColor: "#1e88e5",
      },
      {
        type: "bar",
        label: "Hours coded",
        backgroundColor: firstGoal?.chart_data?.map((item) =>
          item?.actual_seconds / 3600 >= 3 ? "#74E9A2" : "#FF9088"
        ),
        data: firstGoal?.chart_data?.map((item) => item?.actual_seconds / 3600),
        borderSkipped: false,
        barThickness: 120,
        borderRadius: 10,
      },
    ],
  };

  const goalGraphOption = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          // display:false
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
          //  display:false
        },
      },
    },
  };

  // {
  //   backgroundColor: " #9f67ff10",
  // };
  // 🚨 statusBar store
  const langDonut = statusBar?.data?.data?.languages;

  // 🚨 summaries store
  const { cumulative_total, daily_average, data } = summaries?.data ?? {};

  const {
    languages,
    projects,
    dependencies,
    operating_systems,
    categories,
    editors,
    machines,
  } = data?.[data?.length - 1] ?? {};
  const topLanguage = languages?.[0];
  const topProject = projects?.[0];
  const userMachineDetails = [
    {
      name: "Your machine",
      gradient: "card-gradient",
      value: machines?.[0]?.name,
    },
    {
      name: "Operating system",
      gradient: "blue-gradient",
      value: operating_systems?.[0]?.name,
    },
    {
      name: "Editor",
      gradient: "purple-gradient",
      value: editors?.[0]?.name,
    },
    {
      name: "Categories",
      gradient: "red-gradient",
      value: categories?.[0]?.name,
    },

    {
      name: "Most used dependency",
      gradient: "orange-gradient",
      value: dependencies?.[0]?.name,
    },
  ];

  // 🚨statsAgg store
  const topFiveLanguages =
    statsAgg?.data?.data?.languages
      ?.filter((lang) => {
        return lang?.is_verified;
      })
      ?.slice(0, 5) ?? [];

  const boxes = [
    {
      title: "Total code time",
      value: cumulative_total?.text,
      subValue: "   + 2 gain",
    },
    {
      title: "Daily Avg",
      value: daily_average?.text,
      subValue: "+ 2 gain",
    },

    {
      title: "Top Language",
      value: topLanguage?.name,
      subValue: topLanguage?.text,
    },

    {
      title: "Top Project",
      value: topProject?.name,
      subValue: topProject?.text,
    },
  ];

  // useGSAP(() => {
  //   const firstRowEl = firstRow.current;
  //   const secondRowEl = secondRow.current;
  //   if (!firstRowEl || !secondRowEl) return;

  //   const mainTL = gsap.timeline({ delay: 0.1 });
  //   const firstRowCards = gsap.utils.toArray(".dashboard-card", firstRowEl);
  //   const secondRowCards = gsap.utils.toArray(".dashboard-card", secondRowEl);

  //   const firstTL = gsap.timeline();
  //   firstTL.from(firstRowEl, {
  //     opacity: 0,
  //     y: 300,
  //     duration: 1,
  //   });

  //   firstRowCards.forEach((card, index) => {
  //     firstTL.from(
  //       card,
  //       {
  //         opacity: 0,
  //         y: 100,
  //         duration: 2,
  //         ease: "back",
  //       },
  //       index * 0.3
  //     );

  //     const children = card.querySelectorAll("*");

  //     if (children?.length < 1) return;
  //     firstTL.from(
  //       children,
  //       {
  //         opacity: 0,
  //         y: 200,
  //         ease: "power2",
  //         duration: 0.8,
  //         stagger: 0.3,
  //       },
  //       index * 0.2 + 0.2
  //     );
  //   });

  //   const secondTL = gsap.timeline();
  //   secondTL.from(secondRowEl, {
  //     x: -300,
  //     ease: "back",
  //     opacity: 0,
  //   });
  //   secondRowCards.forEach((card) => {
  //     secondTL.from(card, {
  //       x: -300,
  //       duration: 0.4,
  //       ease: "sine",
  //       opacity: 0,
  //     });

  //     // const children = card.querySelectorAll("*");
  //     // if (children?.length < 1) return;
  //     // secondTL.from(
  //     //   children,
  //     //   {
  //     //     opacity: 0,
  //     //     y: 200,
  //     //     ease: "power2",
  //     //     duration: 0.8,
  //     //     stagger: 0.3,
  //     //   },
  //     //   index * 0.2 + 0.2
  //     // );
  //   });

  //   mainTL.add(firstTL);
  //   mainTL.add(secondTL, "-=2");
  // });

  const fullLabels = data?.map((item) => item.range.text);
  const shortLabels = data?.map((item) => {
    const textArr = item.range.text?.split(" ");
    return `${textArr[1]} ${textArr[2]}`; // e.g. "24th 2024"
  });
  const chartData = {
    labels: shortLabels,
    datasets: [
      {
        label: "Coding last 7 days ",
        data: data?.map((item) => item.grand_total.total_seconds / 3600),
        backgroundColor: ["#9f67ff"],
        barThickness: 45,
        borderRadius: 100,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: false,
      tooltip: {
        callbacks: {
          title: (tooltipItems) => {
            const index = tooltipItems[0].dataIndex;
            return `Day: ${fullLabels[index]}`;
          },
          label: (tooltipItem) => {
            const value = tooltipItem.raw.toFixed(2);
            return `Time: ${formatTime(value)}`;
          },
        },
      },
    },
  };

  const donutChartData = {
    labels: langDonut?.map((lang) => lang?.name),
    datasets: [
      {
        label: "Languages used today",
        data: langDonut?.map((lang) => lang?.percent),
        backgroundColor: [
          "#9f67ff",
          "#FDDFAA",
          "#CAF2FD",
          "#3F5280",
          "#E48780",
        ],
        hoverBackgroundColor: [" #9f67ff90", "#FDDFAA90", "#CAF2FD90"],
      },
    ],
  };

  const donutChartOptions = {
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",

        labels: {
          padding: 40,
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
  };
  return (
    <section className=" space-y-6 ">
      {/* 🤓 Header  */}
      <section className="flex justify-between items-center ">
        <div className="space-y-2">
          <h1 className="font-bold text-4xl text-white font-gluten">
            Hello, Biscuit
          </h1>
          <p>This is how busy you've been lately</p>
        </div>

        <div>calendar</div>
      </section>
      {/*  */}

      {/* 👔 MAIN SECTION  */}
      <section className="space-y-6  flex-1 overflow-hidden">
        <section className="min-h-100 gap-y-18 py-10 flex flex-wrap justify-between">
          {/* 🚨 Wrapper  */}

          {/* First  */}
          {userMachineDetails?.map((el) => {
            const { name, gradient, value } = el ?? {};
            return (
              <section className="relative h-80 w-60 rounded-2xl  py-8 px-6 z-50">
                <div
                  className={`flex flex-col justify-between shadow-2xl absolute left-0 bottom-0 h-80 w-60 rounded-3xl  py-8 px-6 z-50 ${gradient}`}
                >
                  <div className="bg-gray-900 !text-white w-10 h-10 rounded-full flex justify-center items-center">
                    <i
                      className="pi pi-cog opacity-60  "
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </div>

                  <div className="space-y-2">
                    <div className="uppercase font-semibold text-md">
                      <p>{name}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      <h3 className="text-3xl ">
                        {" "}
                        <Tooltip title={value}>
                          <p className="cursor-pointer">
                            {truncateString(value, 10)}
                          </p>
                        </Tooltip>
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className={`opacity-90 bottom-[-20px] w-[228px] ${gradient} gradient-card `}
                ></div>
                <div
                  className={`bottom-[-35px]  w-[215px]  opacity-50 ${gradient} gradient-card `}
                ></div>
              </section>
            );
          })}
        </section>
        {/* 🚨 FIRST ROW  */}
        <section
          ref={firstRow}
          className="flex w-full gap-x-4 justify-between h-78"
        >
          {boxes?.map((box, index) => {
            const { title, value } = box ?? {};
            return (
              <section
                className={` flex flex-col justify-between  w-[23%] p-8    ${
                  index === 0 ? "!bg-secondary !text-white" : " bg-tertiary"
                }`}
              >
                <div className="flex justify-between">
                  <div
                    className={`  text-black ${
                      index === 0 && "bg-black !text-white"
                    } 
                     ${index === 1 && "bg-[#5479FB]"}  ${
                      index === 2 && "bg-[#FF9088]"
                    }  ${
                      index === 3 && "bg-[#F84B1A]"
                    }  w-10 h-10 rounded-full flex justify-center items-center `}
                  >
                    <i
                      className="pi pi-cog  "
                      style={{ fontSize: "1.3rem" }}
                    ></i>
                  </div>
                </div>

                <div className="space-y-1">
                  <h1
                    className={` ${
                      index === 0 && "!text-white/80  "
                    } text-[#525252] font-medium`}
                  >
                    {title}
                  </h1>
                  <p className="text-xl text-white font-semibold">{value}</p>
                  {/* <p>{subValue}</p> */}
                </div>
              </section>
            );
          })}
        </section>

        <section className="flex justify-between gap-x-4">
          <section className="w-[60%] space-y-10 ">
            <section className=" dashboard-card  w-full  ">
              <div className="w-11/12 mx-auto space-y-16 py-10">
                <div className="ml-2 space-y-1">
                  <p>Coding stats</p>
                  <h1 className="text-5xl font-semibold">
                    {cumulative_total?.text}
                  </h1>
                  <p>Last 7 days</p>
                </div>
                <Chart type="bar" data={chartData} options={chartOptions} />
              </div>
            </section>
          </section>

          <section className="w-[40%] dashboard-card !rounded-tl-none">
            <section className=" h-full py-10">
              <h1 className="text-3xl text-center font-semibold">
                Languages used today
              </h1>

              <div className=" flex items-center justify-center w-full h-full">
                <Chart
                  type="doughnut"
                  data={donutChartData}
                  options={donutChartOptions}
                  className="w-[90%]"
                />
              </div>
            </section>
          </section>
        </section>
      </section>
      {/*  */}

      <section className="flex justify-between gap-x-4">
        {/* GOALS GRAPH */}

        <section className=" dashboard-card !rounded-bl-none  p-3 w-full">
          <div>
            <h1>GOALS GRAPH</h1>
            <div> Status: {cumulative_status}</div>
            <div>Ignore days: {ignore_days}</div>
            <div>Title: {title}</div>
            <Chart type="bar" data={goalGraph} options={goalGraphOption} />
          </div>
        </section>
      </section>

      {/* WEEKLY GRAPH DETAILS FOR THE YEAR  */}

      <section className="flex justify-between gap-x-4">
        {/*  🚨 TOP LANG IN THE WORLD  */}
        <section className=" h-full w-full  ">
          <section className="dashboard-card space-y-4   !py-10   ">
            <h1 className="text-3xl text-center font-semibold">
              Top 5 languages in the World
            </h1>

            <section className="space-x-8 flex w-full whitespace-nowrap overflow-x-auto py-10 hide-scrollbar ">
              {topFiveLanguages?.map((lang, index) => {
                const { average, count, name, sum } = lang ?? {};

                let color =
                  index === 0
                    ? "#FDA1C1"
                    : index === 1
                    ? "#FDDFAA"
                    : index === 2
                    ? "#3F5280"
                    : index === 3
                    ? "#CAF2FD"
                    : index === 4
                    ? "#E48780"
                    : "";

                const developers = `${count?.text?.split(" ")?.[1]} developers`;
                return (
                  <section
                    key={name}
                    className="flex  items-center relative gap-x-4 w-fit "
                  >
                    <section className="relative">
                      <div
                        style={{ backgroundColor: color }}
                        className={`w-25 h-25 rounded-xl flex justify-center items-center `}
                      >
                        <p className="text-4xl text-[#9391CC] font-semibold">
                          {++index}
                        </p>
                      </div>
                      <div
                        style={{ backgroundColor: color }}
                        className="opacity-30 w-20 h-20 rounded-xl absolute left-[50%] bottom-[-10px] -translate-x-[50%] "
                      ></div>
                    </section>

                    <section className="flex flex-col align-start self-start space-y-2">
                      <div>
                        <h4 className="text-white font-semibold text-2xl">
                          {name} <span className="text-sm">({sum?.text})</span>
                        </h4>
                        <p className="text-gray-500 mt-1">{developers}</p>
                      </div>

                      <div className="py-2 rounded-md px-4 w-fit text-sm flex gap-x-1 bg-[#3A394340] ">
                        <p>Average time: </p>
                        <p>{average?.text}</p>
                      </div>
                    </section>
                  </section>
                );
              })}
            </section>
          </section>
        </section>
      </section>

      <section className=" dashboard-card !rounded-bl-none  p-3 ">
        <div>
          <h1 className="my-10 text-center font-semibold">
            INSIGHTS GRAPH (WEEKLY GRAPH DETAILS FOR THE YEAR)
          </h1>
          <Chart type="line" data={insightGraph} options={insightOptions} />
        </div>
      </section>

      {/*  */}

      {/*  */}
    </section>
  );
}
