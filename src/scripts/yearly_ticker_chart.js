export const onChartSelectYearly = (data) => {
  let tickerSymbol = data.meta.symbol;

  if (window.yearlyChart.id !== "yearlyChart") yearlyChart.destroy();

  document.querySelector(".ticker-chart-yearly").innerHTML =
    chartTemplate(data);
};

let oneYearPrior = new Date(
  Date.now() - 365 * 24 * 60 * 60 * 1000
).toISOString();

const chartTemplate = (chartInfo) => {
  let intervalEightHour = [];
  let open = [];
  Object.values(chartInfo.values).map((datapoint) => {
    let tmpDate = new Date(datapoint.datetime).toISOString();
    if (tmpDate > oneYearPrior) {
      intervalEightHour.unshift(datapoint.datetime.slice(0, 10));
      open.unshift(parseFloat(datapoint.open).toFixed(2));
    }
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  let color =
    open[open.length - 1] - open[0] > 0
      ? "rgb(98, 205, 50)"
      : "rgb(247, 108, 108)";
  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;

  let ctx = document.getElementById("yearlyChart").getContext("2d");

  window.yearlyChart = new Chart(ctx, {
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
          text: `Yearly: ${chartInfo.meta.symbol} (${percentChange}%)`,
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
