import axios from "axios";
import { tdAPIKey } from "../../secret";

document.querySelector(
  ".indices"
).innerHTML = `<ul class="splash-indices"></ul>`;

const fetchData = async () => {
  const response = await axios.get("https://api.twelvedata.com/time_series", {
    params: {
      symbol:
        "SPX, IXIC, DJI, RUT, QQQ, EUR/USD, BTC/USD, USD/JPY, ARKG, ARKK, ARKQ",
      interval: "1day",
      apikey: tdAPIKey,
      // exchange : "NYSE",
      outputsize: 2,
    },
  });
  if (response.error) {
    console.log(
      "API limit reached, please wait one minute for desired feature to reappear."
    );
  }
  return response.data;
};

const closeValue = (num1, num2) => {
  if (num1 - num2 > 0) {
    return `+${(((num1 - num2) / num2) * 100).toFixed(2)}% 
    `;
  } else {
    return `${(((num1 - num2) / num2) * 100).toFixed(2)}% `;
  }
};

export const splashIndices = async (e) => {
  const listings = await fetchData();
  for (let ticker of Object.values(listings)) {
    const arrow =
      parseFloat(ticker.values[0].close) - parseFloat(ticker.values[1].close) >
      0
        ? "fas fa-sort-up positive"
        : "fas fa-sort-down negative";
    const queryOption = document.createElement("li");
    queryOption.classList.add("index");
    queryOption.innerHTML = `

    <h2> <i class="${arrow}"></i> ${ticker["meta"]["symbol"]}: ${parseFloat(
      ticker.values[0].close
    ).toFixed(2)} <span>${closeValue(
      parseFloat(ticker.values[0].close),
      parseFloat(ticker.values[1].close)
    )}</span></h2>
  `;
    parseFloat(ticker.values[0].close) - parseFloat(ticker.values[1].close) > 0
      ? queryOption.classList.add("positive")
      : queryOption.classList.add("negative");

    document.querySelector(".splash-indices").append(queryOption);
  }
};

document.addEventListener("load", splashIndices());
