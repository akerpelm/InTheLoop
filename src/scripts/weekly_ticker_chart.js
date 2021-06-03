import { tdAPIKey, avAPIKey } from "../../secret";
import axios from "axios";

export const onChartSelectWeekly = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  const response = await axios.get("https://api.twelvedata.com/time_series", {
    params: {
      symbol: tickerSymbol,
      interval: "2h",
      output: "200",
      apikey: tdAPIKey,
      source: "docs",
    },
  });

  if (window.weeklyChart.id !== "weeklyChart") weeklyChart.destroy();

  document.querySelector(".ticker-chart-weekly").innerHTML = chartTemplate(
    response.data
  );
};

let oneWeekPrior = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

const chartTemplate = (chartInfo) => {
  let intervalTwoHour = [];
  let open = [];
  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime).toISOString();
    if (tmpDate > oneWeekPrior) {
      intervalTwoHour.unshift(datapoint.datetime);
    }
  });

  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime).toISOString();

    if (tmpDate > oneWeekPrior) {
      open.unshift(parseFloat(datapoint.open).toFixed(2));
    }
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  let color =
    open[open.length - 1] - open[0] > 0 ? "rgb(54, 236, 189)" : "rgb(247, 108, 108)";
  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;

  let ctx = document.getElementById("weeklyChart").getContext("2d");

  window.weeklyChart = new Chart(ctx, {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    data: {
      labels: intervalTwoHour,
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
          text: `Weekly: ${chartInfo.meta.symbol} (${percentChange}%)`,
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
