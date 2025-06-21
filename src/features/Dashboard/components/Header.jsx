import { useRef } from "react";

// STORE
import { useSelector } from "react-redux";
import { getDashboardStore } from "../dashboardSlice";

// GSAP
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// LIB
import { Chart } from "primereact/chart";

export default function Header() {
  const firstRow = useRef(null);
  const secondRow = useRef(null);
  const {
    statsAgg,
    summaries,
    statusBar,
    goals: { data: goalsData },
  } = useSelector(getDashboardStore);

  // 🚨 goals store

  const firstGoal = goalsData?.data?.[0];
  const { cumulative_status, ignore_days, title } = firstGoal ?? {};
  const goalGraph = {
    labels: firstGoal?.chart_data?.map((item) => item?.range?.text),
    datasets: [
      {
        label: "Goal Progress",
        data: firstGoal?.chart_data?.map((item) => item?.actual_seconds / 3600),
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
  console.log(firstGoal, "goalsData");
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
      value: machines?.[0]?.name,
    },
    {
      name: "Operating system",
      value: operating_systems?.[0]?.name,
    },
    {
      name: "Editor",
      value: editors?.[0]?.name,
    },
    {
      name: "Categories",
      value: categories?.[0]?.name,
    },

    {
      name: "Most used dependency",
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

  // console.log(statsAgg?.data, "popopopop");
  useGSAP(() => {
    const firstRowEl = firstRow.current;
    const secondRowEl = secondRow.current;
    if (!firstRowEl || !secondRowEl) return;

    const mainTL = gsap.timeline({ delay: 0.1 });
    const firstRowCards = gsap.utils.toArray(".dashboard-card", firstRowEl);
    const secondRowCards = gsap.utils.toArray(".dashboard-card", secondRowEl);

    const firstTL = gsap.timeline();
    firstTL.from(firstRowEl, {
      opacity: 0,
      y: 300,
      duration: 1,
    });

    firstRowCards.forEach((card, index) => {
      firstTL.from(
        card,
        {
          opacity: 0,
          y: 100,
          duration: 2,
          ease: "back",
        },
        index * 0.3
      );

      const children = card.querySelectorAll("*");

      if (children?.length < 1) return;
      firstTL.from(
        children,
        {
          opacity: 0,
          y: 200,
          ease: "power2",
          duration: 0.8,
          stagger: 0.3,
        },
        index * 0.2 + 0.2
      );
    });

    const secondTL = gsap.timeline();
    secondTL.from(secondRowEl, {
      x: -300,
      ease: "back",
      opacity: 0,
    });
    secondRowCards.forEach((card) => {
      secondTL.from(card, {
        x: -300,
        duration: 0.4,
        ease: "sine",
        opacity: 0,
      });

      // const children = card.querySelectorAll("*");
      // if (children?.length < 1) return;
      // secondTL.from(
      //   children,
      //   {
      //     opacity: 0,
      //     y: 200,
      //     ease: "power2",
      //     duration: 0.8,
      //     stagger: 0.3,
      //   },
      //   index * 0.2 + 0.2
      // );
    });

    mainTL.add(firstTL);
    mainTL.add(secondTL, "-=2");
  });

  const chartData = {
    labels: data?.map((item) => item.range.text),
    datasets: [
      {
        label: "Coding last 7 days ",
        data: data?.map((item) => item.grand_total.total_seconds / 3600),
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

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
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
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        hoverBackgroundColor: [
          "rgb(255, 159, 64)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
      },
    ],
  };

  const donutChartOptions = {
    cutout: "60%",
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
        {/* 🧵 FIRST ROW  */}
        <section
          className="flex gap-x-4 justify-between align-items pt-4"
          ref={firstRow}
        >
          {/* 🎁 4 BOXES */}
          <section className=" grid grid-cols-2 gap-4 w-[40%]">
            {boxes?.map((box, index) => {
              const { title, value, subValue } = box ?? {};
              return (
                <div
                  key={title}
                  className={`dashboard-card     h-42 relative  ${
                    index === 0
                      ? "!bg-white !text-primary !rounded-br-none"
                      : "!text-[#FEFEFE]"
                  } ${index === 1 && "!rounded-bl-none"}  ${
                    index === 2 && "!rounded-tr-none"
                  }  ${index === 3 && "!rounded-tl-none"} `}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-normal text-lg">{title}</h2>
                    <div
                      className={`h-12 w-12 text-white   rounded-full flex justify-center items-center ${
                        index === 0 ? "bg-blue-600 " : "bg-gray-1000 "
                      }`}
                    >
                      <i className="pi pi-arrow-up-right"></i>
                    </div>
                  </div>

                  <div className="absolute bottom-5 w-full  ">
                    <div className="flex gap-x-4">
                      <div>
                        <h1 className="text-3xl "> {value}</h1>
                        <div className="flex gap-x-2 items-center text-xs mt-2">
                          <p className=" ">This month</p>
                          <p className="px-3 bg-green-300  text-green-800 font-semibold rounded-full py-1">
                            {subValue}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          {/*  */}

          <section className="w-[60%] dashboard-card !rounded-bl-none  p-3">
            <div>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </div>
          </section>
        </section>

        {/* 🛒 SECOND ROW  */}
        <section ref={secondRow} className=" flex  justify-between gap-x-4">
          {/* 🎁 2 BOXES */}
          <section className="grid grid-cols-2 gap-4 w-[60%]">
            {/*  🚨 TOP LANG IN THE WORLD  */}
            <section className="dashboard-card !rounded-tr-none space-y-4   ">
              {" "}
              <h1>Top 5 languages in the World</h1>
              {topFiveLanguages?.map((lang) => {
                const { average, count, name, sum } = lang ?? {};
                return (
                  <section
                    key={name}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <h4>{name}</h4>
                      <p>{count?.text}</p>
                    </div>

                    <div>
                      <p>Average time used</p>
                      <p>{average?.text}</p>
                    </div>

                    <div>
                      <p>Total time</p>
                      <p>{sum?.text}</p>
                    </div>
                  </section>
                );
              })}
            </section>

            <section className="dashboard-card !rounded-tl-none     ">
              <h1>Your machine details</h1>
              {userMachineDetails?.map((el) => {
                const { name, value } = el ?? {};
                return (
                  <section key={name} className="">
                    <div>
                      <h4>{name}</h4>
                      <p>{value}</p>
                    </div>
                  </section>
                );
              })}
            </section>
          </section>

          <section className="w-[40%] dashboard-card !rounded-tl-none">
            <section>
              <p>Language graaph /users/current/status_bar/today</p>
              <Chart
                type="doughnut"
                data={donutChartData}
                options={donutChartOptions}
                className="w-full md:w-30rem"
              />
            </section>
          </section>
        </section>
      </section>
      {/*  */}

      {/* THIRD ROW  */}

      <section className=" dashboard-card !rounded-bl-none  p-3">
        <div>
          <h1>GOALS GRAPH</h1>
          <div> Status: {cumulative_status}</div>
          <div>Ignore days: {ignore_days}</div>
          <div>Title: {title}</div>
          <Chart type="bar" data={goalGraph} options={chartOptions} />
        </div>
      </section>

      {/*  */}

      
      {/* THIRD ROW  */}

      <section className=" dashboard-card !rounded-bl-none  p-3">
        <div>
          <h1>INSIGHTS GRAPH (WEEKLY GRAPH DETAILS FOR THE YEAR)</h1>
          <Chart type="bar" data={goalGraph} options={chartOptions} />
        </div>
      </section>

      {/*  */}
    </section>
  );
}
