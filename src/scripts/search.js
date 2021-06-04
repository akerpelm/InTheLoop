import * as Util from "./util";
import { avAPIKey } from "../../secret";
import axios from "axios";
import { onTickerSelect } from "./ticker_info";
import { onChartSelectDaily } from "./daily_ticker_chart";
import { onChartSelectWeekly } from "./weekly_ticker_chart";
import { onChartSelectMax } from "./max_ticker_chart";
import { onChartSelectMonthly } from "./monthly_ticker_chart";
import { onChartSelectYearly } from "./yearly_ticker_chart";

const fetchData = async (searchQuery) => {
  const response = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "SYMBOL_SEARCH",
      keywords: searchQuery,
      apikey: avAPIKey,
    },
  });
  if (response.data.Error) {
    return [];
  }
  return response.data.bestMatches;
};

const search = document.querySelector(".search");
search.innerHTML = `
  <input class="input" id="search-input" placeholder="Search"/>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results">
      </div>
    </div>
  </div>
  `;

const input = document.querySelector(".input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");

export const onInput = async (e) => {
  const listings = await fetchData(e.target.value);
  if (!listings) {
    return dropdown.classList.remove("is-active");
  }
  resultsWrapper.innerHTML = "";

  dropdown.classList.add("is-active");

  for (let ticker of listings) {
    const queryOption = document.createElement("a");
    queryOption.classList.add("dropdown-item");
    queryOption.innerHTML = ` <h2> ${ticker["1. symbol"]} - ${ticker["2. name"]}</h2>
        `;
    queryOption.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = ticker["2. name"];
      onTickerSelect(ticker);
      onChartSelectDaily(ticker);
      onChartSelectWeekly(ticker);
      onChartSelectMonthly(ticker);
      onChartSelectYearly(ticker);
      onChartSelectMax(ticker);
    });
    resultsWrapper.appendChild(queryOption);
  }
};

input.addEventListener("input", Util.debounce(onInput));

document.addEventListener("click", (e) => {
  if (!search.contains(e.target)) {
    dropdown.classList.remove("is-active");
  }
});
