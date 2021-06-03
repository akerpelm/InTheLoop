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

  if (response.data.Error) {
    return [];
  }
  document.querySelector(".single-ticker").innerHTML = tickerTemplate(
    response.data
  );
};

const tickerTemplate = (tickerDetail) => {
  if (!tickerDetail.Name) {
    return `
    <div class="content">
    <p>Due to the limitations of a the free API used to fetch historical data, some ETFs do not display complete/up-to-date information</p>
    <p>Any other search will yield a full information page!</p>
    <p>Check out some common tickers such as AAPL, MSFT, SBUX, or NKE!</p>
    </div>`;
  } else {
    return `
    <div class="content">
        <h1>${tickerDetail.Name} (${tickerDetail.Symbol})</h1>
        <h4>Overview</h4>
        <p>Sector: ${tickerDetail.Sector}</p>
        <p>Industry: ${tickerDetail.Industry}</p>
        <p>Employees: ${tickerDetail.FullTimeEmployees}</p>
        <p>${tickerDetail.Description}</p>
        <p>Address: ${
          tickerDetail.Address === "None"
            ? "No address found"
            : tickerDetail.Address
        }</p>
        <p></p>
        <h4>Financials</h4>
        <p>Market Cap: <span>${
          tickerDetail.MarketCapitalization > 999999999
            ? "$" +
              (tickerDetail.MarketCapitalization / 1000000000).toFixed(2) +
              "B"
            : "$" +
              (tickerDetail.MarketCapitalization / 1000000).toFixed(2) +
              "M"
        }</span></p>
        
        <p>52 Week High: <span>$${tickerDetail["52WeekHigh"]}</span></p>
        <p>52 Week Low: <span>$${tickerDetail["52WeekLow"]}</span></p>
        <p>Price/Earnings-to-Growth (PEG) Ratio: <span>${
          tickerDetail["PEGRatio"]
        }</span></p>
        <p>Forward Price-Eearnings (Forward PE): <span>${
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
        <p>50-Day Moving Average (50D MA): <span>${
          tickerDetail["50DayMovingAverage"]
        }</span></p>
        <p>Placeholder</p>
    </div>`;
  }
};
