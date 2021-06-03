import { tdAPIKey } from "../../secret";
import axios from "axios";

export const onChartSelectMonthly = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  const response = await axios.get("https://api.twelvedata.com/time_series", {
    params: {
      symbol: tickerSymbol,
      interval: "8h",
      output: "200",
      apikey: tdAPIKey,
      source: "docs",
    },
  });

  if (window.monthlyChart.id !== "monthlyChart") monthlyChart.destroy();

  document.querySelector(".ticker-chart-monthly").innerHTML = chartTemplate(
    response.data
  );
};

const chartTemplate = (chartInfo) => {
  let intervalEightHour = [];
  let open = [];
  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime);
    if (
      //   tmpDate.getDay() >= new Date(Date.now()).getDay() &&
      tmpDate.getMonth() >=
      new Date(Date.now()).getMonth() - 1
    ) {
      open.unshift(parseFloat(datapoint.open).toFixed(2));
      intervalEightHour.unshift(datapoint.datetime.slice(0,10));
    }
  });

  console.log(intervalEightHour);
  console.log(open);

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  percentChange =
    percentChange > 0 ? "+" + percentChange + "%" : percentChange + "%";
  let color =
    open[open.length - 1] - open[0] > 0
      ? "rgb(54, 236, 189)"
      : "rgb(247, 108, 108)";

  let ctx = document.getElementById("monthlyChart").getContext("2d");

  window.monthlyChart = new Chart(ctx, {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    data: {
      labels: intervalEightHour,
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
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Monthly: ${chartInfo.meta.symbol} (${percentChange})`,
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
