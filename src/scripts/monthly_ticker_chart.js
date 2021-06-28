export const onChartSelectMonthly = (data) => {
  let tickerSymbol = data.meta.symbol;
  if (window.monthlyChart.id !== "monthlyChart") monthlyChart.destroy();

  document.querySelector(".ticker-chart-monthly").innerHTML =
    chartTemplate(data);
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
      intervalEightHour.unshift(datapoint.datetime.slice(0, 10));
    }
  });
  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);

  percentChange =
    percentChange > 0 ? "+" + percentChange + "%" : percentChange + "%";
  let color =
    open[open.length - 1] - open[0] > 0
      ? "rgb(98, 205, 50)"
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
      maintainAspectRatio: false,

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
