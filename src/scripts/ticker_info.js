import { avAPIKey } from "../../secret";
import axios from "axios";

export const onTickerSelect = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  const response = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "OVERVIEW",
      symbol: tickerSymbol,
      apikey: avAPIKey,
    },
  });
  if (response) {
    const splash = document.querySelector(".splash");
    splash.style.display = "none";
    const splashTwo = document.querySelector(".splash-2");
    splashTwo.style.display = "none";
    const search = document.querySelector(".search");
    search.style.display = "flex";
    const searchTwo = document.querySelector(".search-2");
    searchTwo.style.display = "none";
    document.querySelector(".js-itl-logo").style.display = "block";
    const demo = document.querySelector("#search-btn");
    demo.style.display = "none";
  }
  if (response.data.Error) {
    return [];
  }
  document.querySelector(".hidden-columns").classList.add("columns");
  document.querySelector(".single-ticker").innerHTML = tickerTemplate(
    response.data
  );
};

const tickerTemplate = (tickerDetail) => {
  if (!tickerDetail.Name) {
    return `
    <div class="content">
    <p>Oops! One of two things may have gone wrong!</p>
    
    <p>1) Due to the limitations of a the free API used to fetch historical data, some ETFs and non-US securities do not display complete/up-to-date information</p>
    <p>Any other search will yield a full information page!</p>
    <p>Check out some US-listed securities such as AAPL, MSFT, SBUX, or NKE for best results.</p>

    <p>2) The free API can only fetch so much data in a day (5 requests/min; 500/day)! If this number is exceeded, the charts and info will not populate. The premium API is pricey, so if you know anyone who is hiring...</p>
    <p>In this case, refresh the page and try again, or wait 1 minute before trying again!</p>
    </div>`;
  } else {
    return `
    <div class="content">
        <h1 id="info-top"><span class="info-name">${
          tickerDetail.Name
        }</span> (${tickerDetail.Symbol})</h1>
        <h4>Overview</h4>
        <p>Sector: </br>${tickerDetail.Sector}</p>
        <p>Industry: </br>${tickerDetail.Industry}</p>
        <p>${tickerDetail.Description}</p>
        <p>Address: </br>${
          tickerDetail.Address === "None"
            ? "No address found"
            : tickerDetail.Address
        }</p>
        <p></p>
        <h4>Metrics</h4>
        <p>Market Cap: <span>${
          tickerDetail.MarketCapitalization > 999999999
            ? "$" +
              (tickerDetail.MarketCapitalization / 1000000000).toFixed(2) +
              "B"
            : "$" +
              (tickerDetail.MarketCapitalization / 1000000).toFixed(2) +
              "M"
        }</span></p>
        
        <p>Price/Earnings-to-Growth (PEG) Ratio: <span>${
          tickerDetail["PEGRatio"]
        }</span></p>
        <p>Forward Price-Earnings (Forward PE): <span>${
          tickerDetail["ForwardPE"]
        }</span></p>
        <p>Price-to-Book (PB) Ratio: <span>${
          tickerDetail["PriceToBookRatio"]
        }</span></p>
        
        <p>Shares Outstanding: <span>${
          tickerDetail.SharesOutstanding > 999999999
            ? (tickerDetail.SharesOutstanding / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesOutstanding / 1000000).toFixed(2) + "M"
        }</span></p>
        <p>Shares Float: <span>${
          tickerDetail.SharesFloat > 999999999
            ? (tickerDetail.SharesFloat / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesFloat / 1000000).toFixed(2) + "M"
        }</span></p>
        <p>Shares Short: <span>${
          tickerDetail.SharesShort > 999999999
            ? (tickerDetail.SharesShort / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesShort / 1000000).toFixed(2) + "M"
        }</span></p>

        <p>Insider Ownership: <span>${
          tickerDetail["PercentInsiders"]
        }%</span></p>
        <p>Institutional Ownership: <span>${
          tickerDetail["PercentInstitutions"]
        }%</span></p>

        <h4>Technicals</h4>
        <p>52 Week High: <span>$${tickerDetail["52WeekHigh"]}</span></p>
        <p>52 Week Low: <span>$${tickerDetail["52WeekLow"]}</span></p>
        <p>50-Day Moving Average (50d MA): <span>${
          tickerDetail["50DayMovingAverage"]
        }</span></p>
        <p>Work in Progress...</p>
    </div>`;
  }
};
