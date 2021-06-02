import { apiKey } from "../../secret";
import axios from "axios";

export const onChartSelect = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  const response = await axios.get("https://api.twelvedata.com/time_series", {
    params: {
      symbol: tickerSymbol,
      interval: "5min",
      output: "200",
      apikey: "",
      source: "docs",
    },
  });

  document.querySelector(".ticker-chart").innerHTML = chartTemplate(
    response.data
  );
};

const chartTemplate = (chartInfo) => {
  let intervalFifteen = [];
  let open = [];
  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime);
    if (tmpDate.getDay() == new Date(Date.now()).getDay()) {
      intervalFifteen.unshift(datapoint.datetime.slice(11));
    }
  });

  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime);
    if (tmpDate.getDay() == new Date(Date.now()).getDay()) {
      open.unshift(parseFloat(datapoint.open).toFixed(2));
    }
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;
  let ctx = document.getElementById("myChart").getContext("2d");

  let color =
    open[open.length - 1] - open[0] > 0 ? "rgb(0,255,0)" : "rgb(255, 0, 0)";
  let myChart = new Chart(ctx, {
    responsive: true,
    maintainAspectRatio: false,
    type: "line",
    data: {
      labels: intervalFifteen,
      datasets: [
        {
          label: "",
          data: open,
          borderColor: color,
          borderWidth: 3,
          pointHitRadius: 50,
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
          ticks: {
            title: {
              display: "Time",
              display: true,
            },
            // display: false, //this will remove only the label
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `${chartInfo.meta.symbol} (${percentChange}%)`,
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

  //   if (myChart) {
  //     myChart.destroy();
  //   }
  //   ctx = document.getElementById("myChart").getContext("2d");
};
