import { tdAPIKey, avAPIKey } from "../../secret";
import axios from "axios";

export const onChartSelectMax = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
 const response = await axios.get("https://api.twelvedata.com/time_series", {
   params: {
     symbol: tickerSymbol,
     interval: "1week",
     outputsize: "5000",
     apikey: tdAPIKey,
     source: "docs",
   },
 });

   if (response.data.Error) {
     return [];
   }
  if (window.maxChart.id !== "maxChart") maxChart.destroy();

  document.querySelector(".ticker-chart-max").innerHTML = chartTemplate(
    response.data
  );
};

const chartTemplate = (chartInfo) => {
  let intervalWeekly = [];
  let open = [];

  Object.values(chartInfo.values).map((datapoint) => {
    open.unshift(datapoint.open);
    intervalWeekly.unshift(datapoint.datetime);
  });
  // Object.keys(chartInfo.values).map((datapoint) => {
  //   debugger
  // });
  
  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);
  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;

  let color =
    open[open.length - 1] - open[0] > 0 ? "rgb(54, 236, 189)" : "rgb(247, 108, 108)";

  let ctx = document.getElementById("maxChart").getContext("2d");

  window.maxChart = new Chart(ctx, {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    data: {
      labels: intervalWeekly,
      datasets: [
        {
          label: "",
          data: open,
          borderColor: color,
          borderWidth: 3,
          pointHitRadius: 100,
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderCapStyle: "round",
          tension: 0.2,
        },
        point: {
          radius: 0,
        },
      },
      maintainAspectRatio: false,
      scales: {
        grid: {
          color: "rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0)",
          display: false,
        },
        y: {
          beginAtZero: false,
        },

        x: {
          grid: {
            color: "rgba(0,0,0,0)",
            borderColor: "rgba(0,0,0,0)",
            tickColor: "rgba(0,0,0,0)",
          },
          display: false,
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Max: ${chartInfo.meta.symbol} (${percentChange}%)`,
          color: color,
        },
        legend: {
          labels: {
            boxWidth: 0,
          },
        },
      },
    },
  });
};
