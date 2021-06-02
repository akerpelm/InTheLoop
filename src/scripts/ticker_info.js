import { apiKey } from "../../secret";
import axios from "axios";

export const onTickerSelect = async (arg) => {
  let tickerSymbol = arg["1. symbol"];
  const response = await axios.get("https://www.alphavantage.co/query", {
    params: {
      function: "OVERVIEW",
      symbol: tickerSymbol,
      apikey: apiKey,
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
  // console.log(tickerDetail);
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
        <p>Market Cap: ${
          tickerDetail.MarketCapitalization > 999999999
            ? "$" +
              (tickerDetail.MarketCapitalization / 1000000000).toFixed(2) +
              "B"
            : "$" +
              (tickerDetail.MarketCapitalization / 1000000).toFixed(2) +
              "M"
        }</p>
        
        <p>52 Week High: $${tickerDetail["52WeekHigh"]}</p>
        <p>52 Week Low: $${tickerDetail["52WeekLow"]}</p>
        <p>Price/Earnings-to-Growth (PEG) Ratio: ${tickerDetail["PEGRatio"]}</p>
        <p>Forward Price-Eearnings (Forward PE): ${
          tickerDetail["ForwardPE"]
        }</p>
        <p>Price-to-Book (PB) Ratio: ${tickerDetail["PriceToBookRatio"]}</p>
        
        <p>Shares Outstanding: ${
          tickerDetail.SharesOutstanding > 999999999
            ? (tickerDetail.SharesOutstanding / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesOutstanding / 1000000).toFixed(2) + "M"
        }</p>
        <p>Shares Float: ${
          tickerDetail.SharesFloat > 999999999
            ? (tickerDetail.SharesFloat / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesFloat / 1000000).toFixed(2) + "M"
        }</p>
        <p>Shares Short: ${
          tickerDetail.SharesShort > 999999999
            ? (tickerDetail.SharesShort / 1000000000).toFixed(2) + "B"
            : (tickerDetail.SharesShort / 1000000).toFixed(2) + "M"
        }</p>

        <p>Insider Ownership: ${tickerDetail["PercentInsiders"]}%</p>
        <p>Institutional Ownership: ${tickerDetail["PercentInstitutions"]}%</p>

        <h4>Technicals</h4>
        <p>50-Day Moving Average (50D MA): ${
          tickerDetail["50DayMovingAverage"]
        }</p>
        <p>Placeholder</p>
    </div>`;
};
