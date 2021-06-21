export const onChartSelectDaily = (data) => {
  let tickerSymbol = data.meta.symbol;

  if (tickerSymbol) {
    const tabContainer = document.querySelector(".tab-container");
    tabContainer.style.visibility = "visible";
    document.querySelector(".single-ticker").style.overflowY = "scroll";
    document.querySelector(".chart").classList.add("is-active-chart");
  }
  if (window.dailyChart.id !== "dailyChart") dailyChart.destroy();
  document.querySelector(".ticker-chart-daily").innerHTML = chartTemplate(data);
};

const chartTemplate = (chartInfo) => {
  let intervalFifteen = [];
  let open = [];
  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime);
    if (tmpDate.getDay() == new Date(Date.now()).getDay()) {
      intervalFifteen.unshift(datapoint.datetime.slice(11));
      open.unshift(parseFloat(datapoint.open).toFixed(2));
    }
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  percentChange =
    percentChange > 0 ? "+" + percentChange + "%" : percentChange + "%";

  percentChange =
    percentChange !== "NaN%"
      ? percentChange
      : "Regular trading hours have not begun";

  let color =
    open[open.length - 1] - open[0] > 0
      ? "rgb(54, 236, 189)"
      : "rgb(247, 108, 108)";
  color = percentChange.length > 10 ? "rgb(54, 236, 189)" : color;

  let ctx = document.getElementById("dailyChart").getContext("2d");

  window.dailyChart = new Chart(ctx, {
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
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Daily: ${chartInfo.meta.symbol} (${percentChange})`,
          color: color,
          font: {
            family:
              "Cambria, 'Cochin', 'Georgia', 'Times', 'Times New Roman', serif",
            size: 18,
          },
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
