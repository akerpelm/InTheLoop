import * as Util from "./util";
import { avAPIKey, tdAPIKey } from "../../secret";
import axios from "axios";
import { onTickerSelect } from "./ticker_info";
import { onChartSelectDaily } from "./daily_ticker_chart";
import { onChartSelectWeekly } from "./weekly_ticker_chart";
import { onChartSelectMax } from "./max_ticker_chart";
import { onChartSelectMonthly } from "./monthly_ticker_chart";
import { onChartSelectYearly } from "./yearly_ticker_chart";
const twelvedata = require("twelvedata");
const config = {
  key: tdAPIKey,
};
const client = twelvedata(config);

const fetchData = async (searchQuery) => {
  const response = await axios.get("https://api.twelvedata.com/symbol_search", {
    params: {
      symbol: searchQuery,
      exchange: "NYSE",
      exchange_timezone: "America/New_York",
      country: "United States",

      // keywords: searchQuery,
      // apikey: avAPIKey,
    },
  });
  if (response.data.Error) {
    return [];
  }
  // let unique = [];

  // response.data.data.forEach((datapoint) =>
  //   unique.includes(datapoint.symbol) ? unique.push(datapoint) : ""
  // );
  return response.data.data.filter(
    (datapoint) => datapoint.country == "United States"
  );
  // return response.data.bestMatches.filter(
  //   (match) =>
  //     match["3. type"] == "Equity" && match["4. region"] === "United States"
  // );
};

const search = document.querySelector(".search");
search.innerHTML = `
  <input class="input" id="search-input" autocomplete="off" placeholder="Search by name or ticker..."/>
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
    queryOption.innerHTML = ` <h2> ${ticker.symbol} - ${ticker.instrument_name}</h2>
        `;
    queryOption.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = ticker.instrument_name;

      const params = {
        symbols: [ticker.symbol],
        intervals: ["1min", "1h", "8h", "1week"],
        outputsize: 670,
        methods: [
          "time_series",
          // {
          //   name: "ema",
          //   time_period: 12,
          // },
        ],
      };

      client
        .complexData(params)
        .then((data) => {
          onChartSelectDaily(data.data[0]);
          onChartSelectWeekly(data.data[1]);
          onChartSelectMonthly(data.data[1]);
          onChartSelectYearly(data.data[2]);
          onChartSelectMax(data.data[3]);
        })
        .catch((error) => {
          console.log(error);
        });

      onTickerSelect(ticker);
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

const searchTwo = document.querySelector(".search-2");
searchTwo.innerHTML = `
  <input class="input-2" id="search-input" autocomplete="off" placeholder="Search by name or ticker..."/>
  <div class="dropdown-2">
    <div class="dropdown-menu-2">
      <div class="dropdown-content results-2">
      </div>
    </div>
  </div>
  `;

const inputTwo = document.querySelector(".input-2");
const dropdownTwo = document.querySelector(".dropdown-2");
const resultsWrapperTwo = document.querySelector(".results-2");

export const onInputTwo = async (e) => {
  const listings = await fetchData(e.target.value);
  if (!listings) {
    return dropdownTwo.classList.remove("is-active");
  }
  resultsWrapperTwo.innerHTML = "";

  dropdownTwo.classList.add("is-active");

  for (let ticker of listings) {
    const queryOption = document.createElement("a");
    queryOption.classList.add("dropdown-item");
    queryOption.innerHTML = ` <h2> ${ticker.symbol} - ${ticker.instrument_name}</h2>
        `;
    queryOption.addEventListener("click", () => {
      dropdownTwo.classList.remove("is-active");
      inputTwo.value = ticker.instrument_name;

      const params = {
        symbols: [ticker.symbol],
        intervals: ["1min", "1h", "8h", "1week"],
        outputsize: 670,
        methods: [
          "time_series",
          // {
          //   name: "ema",
          //   time_period: 12,
          // },
        ],
      };

      client
        .complexData(params)
        .then((data) => {
          onChartSelectDaily(data.data[0]);
          onChartSelectWeekly(data.data[1]);
          onChartSelectMonthly(data.data[1]);
          onChartSelectYearly(data.data[2]);
          onChartSelectMax(data.data[3]);
        })
        .catch((error) => {
          console.log(error);
        });

      onTickerSelect(ticker);
    });
    resultsWrapperTwo.appendChild(queryOption);
  }
};

inputTwo.addEventListener("input", Util.debounce(onInputTwo));

document.addEventListener("click", (e) => {
  if (!searchTwo.contains(e.target)) {
    dropdownTwo.classList.remove("is-active");
  }
});
