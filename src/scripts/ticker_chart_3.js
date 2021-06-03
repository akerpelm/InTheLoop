import { tdAPIKey, avAPIKey } from "../../secret";
import axios from "axios";

export const onChartSelectMax = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  console.log(tickerSymbol)
  const response = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "TIME_SERIES_WEEKLY",
      symbol: tickerSymbol,
      apikey: avAPIKey,
    },
  });
  if (window.maxChart.id !== "maxChart") maxChart.destroy();

  document.querySelector(".ticker-chart-max").innerHTML = chartTemplate(
    response.data
  );
};

const chartTemplate = (chartInfo) => {
  let intervalWeekly = [];
  let open = [];
  Object.values(chartInfo["Weekly Time Series"]).map((datapoint) => {
    open.unshift(datapoint["1. open"]);
  });
  Object.keys(chartInfo["Weekly Time Series"]).map((datapoint) => {
    intervalWeekly.unshift(datapoint);
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);
  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;

  let color =
    open[open.length - 1] - open[0] > 0 ? "rgb(0,255,0)" : "rgb(255, 0, 0)";

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
          text: `Historical: ${chartInfo["Meta Data"]["2. Symbol"]}
 (${percentChange}%)`,
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
