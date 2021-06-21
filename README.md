# InTheLoop


## Table of Contents
* [Major Technologies Used](https://github.com/akerpelm/InTheLoop#major-technologies-used)
* [Features](https://github.com/akerpelm/InTheLoop#features)
    * [API Endpoints](https://github.com/akerpelm/InTheLoop#fetching-data-from-api-endpoints) 
    * [Chart.js/Data Visualization](https://github.com/akerpelm/InTheLoop#chartjsdata-visualization)
    * [Search Functionality](https://github.com/akerpelm/InTheLoop#search-functionality)
    * [Wiki](https://github.com/akerpelm/InTheLoop#wiki)
* [Future Direction](https://github.com/akerpelm/InTheLoop#future-direction)
* [Limitations](https://github.com/akerpelm/InTheLoop#limitations)
* [Design Docs](https://github.com/akerpelm/InTheLoop#design-docs)

### What is InTheLoop?
* A data visualization tool for New York Stock Exchange (NYSE) listed companies crated in < 72 hours. 
* Visualization includes price action for a stock at different timeframes, as well as information and metrics about the specified company.

## Demo
Here is a link to the web application: [inTheLoop](https://akerpelm.github.io/InTheLoop/)

![itl_demo](https://user-images.githubusercontent.com/77806372/122697726-f4e82c00-d213-11eb-9889-afffee0a27ee.gif)


## Major Technologies Used
* JavaScript: this single-page application was built entirely with JavaScript without reliance on a database or a backend.
* Chart.js: data extrpolated from the various API endpoints was compiled into a chart using Chart.js.
* TwelveData API: a "complex data" API call allowed all charts to fetch data from one API request, which was preferred over other APIs.
* Alpha Vantage API: an API endpoint providing a broad overview of information for each specific listing was available, and was used for exactly this.

## Features
### Fetching Data from API Endpoints
* Fetch data about all listings (to ensure search functionality), and individual listings (to ensure single listing view functionality) (1st API endpoint using Alpha Vantage).
* Fetch and display a single listing's information (2nd API endpoint using Alpha Vantage)
* Fetch time series data to show price action over different timeframes (1st API endpoint using TwelveData).

```javascript
const fetchData = async (searchQuery) => { //the simplest API call to allow search functionality
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


```

### Chart.js/Data Visualization
* API endpoint response data extracted andlinked to Chart.js for multiple timeframes.
* Multiple timeframe line charts created using the JavaScript Chart.js library.
* Customization of features to present clear and readable charts without any extraneous information. 
* Ability to hover over a datapoint for more information about the open price and exact time at the specified location. 

``` javascript
 document.querySelector(".ticker-chart-max").innerHTML = chartTemplate(data);

const chartTemplate = (chartInfo) => { //manipulation of response data for chart presentation.
  let intervalWeekly = [];
  let open = [];

  Object.values(chartInfo.values).map((datapoint) => {
    open.unshift(datapoint.open);
    intervalWeekly.unshift(datapoint.datetime);
  });

  let percentChange = (
    ((open[open.length - 1] - open[0]) / open[0]) *
    100
  ).toFixed(2);
  percentChange = percentChange > 0 ? "+" + percentChange : percentChange;

  let color = //determine the color of the line chart based on price Δ from open (or least recent datapoint) to present
    open[open.length - 1] - open[0] > 0
      ? "rgb(54, 236, 189)"
      : "rgb(247, 108, 108)";
  ...
}
```

### Search Functionality
  * Functional search bar allowing to search for any globally-listed security.
  * Use of API endpoint to return data based on user input.
  * Debounce logic present to limit API requests and improve app performance on a 300ms timeout.
  * Create logic and functionality that presents and autocompletes search bar similtaneous to user input.
``` javascript
export const debounce = (cb) => { //dynamic debounce code to be used throughout code base. 
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb.apply(null, args);
    }, 300);
  };
};

const input = document.querySelector(".input"); // implementation of debounce in search bar functionality
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
  ...      
  
  input.addEventListener("input", Util.debounce(onInput));
```
![search_demo](https://user-images.githubusercontent.com/77806372/122698290-054cd680-d215-11eb-827e-98653742b2db.gif)


### Wiki
* Creation of Wiki modal to explain site functionality and allow for more seamless user experience.
* Done through use of a modal to keep the site uncluttered and application-like.

![wiki](https://user-images.githubusercontent.com/77806372/122698634-adfb3600-d215-11eb-915a-652eb7bc0d46.gif)


## Future Direction
* Add a premium API key to allow for more requests. As a result, more information will become available for display on the information page as well as the chart.
* Include trading volume, candlestick charts as view options for charts.
* Make more API requests for technical analysis tools (SMA, EMA, BB, RSI initially).
* Include ability to overlap technical analysis with current chart.
* Display a listing's option chain, unusual option activity (API contingent).

## Limitations
* The APIs used to gather data are free versions, meaning there is a limit to the requests that can be made to data per day. As a result, the application does not show realtime data, after-hours trading, or all of the information that is desired on the chart (trading volume, TA). This would involve more requests than allowed on a free plan of the APIs.
* Certain ETFs and non-US listed securities do not display data, resulting in blank information pages and charts. Error handling has been implemented to show an error message if this occurs.
* Charts do not account for historical stock splits, a chart may show what appears to be a sudden correction/price decline.
* The "Max" chart shows the price action as far back as data was available in the creation of this site.
* The metrics and technicals sections of a listing's information page are limited to what was present on a listing's API response. This is not indicative of the 'best' metrics, or ones that are valued by the author.

<h1 align="center">
   * * END * *
</h1>

</br>



# Design Docs

## What?
* A data visualization tool for New York Stock Exchange (NYSE) listed companies. 
* Initially, visualization will include historical price action for a stock, as well as information and metrics about the company.
* Eventually, would like to implement the ability to visualize the options chain, track unusual options activity, as well as showing some basic tools of technical analysis (SMA, EMA, RSI, Bollinger Bands)

## Why?
* A passion of mine, something I strive to learn more about every day.
* Keeping the verbeage simple, this would serve as a sort of instructional application for people seeking to learn more about finance and the stock market. 
* The initial application would allow me to gather data, and present it using DOM manipulation. There is the possiblity of scaling, with the addition of features. 

## Functionality and MVPs
* A default view of three major indices tracking NYSE listings (SPY, DJI, NDAQ, possibly QQQ)
* A search feature allowing users to search for a listing by name. The search feature will auto-populate based on user input.
* A specific view for the selected listing, including historical data (market cap, employees, all-time high, 52 week high) as well as visualization of its price action (ideally with the ability to view it at different intervals)

### MVP 1: Index
* A page that charts the largest indices on the NYSE, with the ability to click between them using tabs.
* The ability to visualize data in different time frames (1d, 1m, 3m, 1y, 5y)
* Initially, the data in the chart will be static, but eventually, would like to implement real-time functionality.

### MVP 2: Individual Listing Show
* A page that shows charts for each individual listing. In addition to a chart similar to MVP 1, the page will include information about the company (market cap, CEO, description, all-time-highs).
* API key contingent, display the options chain for the listing.
* As with the index, a chart will display historical price action for each listing. The chart will be implimented initially using chart.js, with D3 being the eventual goal. The challenge in this will be creating presentable charts, notably with regards to logic surrounding color...red if the price action is negative in the timeframe (ie: -2% in 6 month view), green is not (ie: +5% in 1 month view). Additionally, adding multiple chart types may provide challenging, as line charts are the basic view for stock charts, but many individuals prefer things such as candlesticks, which require implementation of high/low/open/close.

### MVP 3: Search
* The landing page will have a search bar to search for individual listing.
* The search bar will show all results that match the user and update in real time (possibly implementing debouncing to API calls).
* Debounce feature **must** be present to limit API calls, as limit is 1000/day, 5/minute for free feature.
* On click, redirect to the listing show page (MVP 2)

### MVP 4: FAQ
* Modal that explains the site's functionality, with in depth explanation of each displayed component, so that individuals who may not have a solid understanding of active investing can still follow/enjoy the site's use. 

## Wireframes
* Default view: **NB: disregard title (Stock Croc), this was my initial idea, but ended up not sticking with it.
*<img width="1030" alt="Screen Shot 2021-05-29 at 10 43 38 PM" src="https://user-images.githubusercontent.com/77806372/120090971-ae038c80-c0d4-11eb-8c94-f18e3d0b541e.png">
* Search:
<img width="1033" alt="Screen Shot 2021-05-29 at 10 58 47 PM" src="https://user-images.githubusercontent.com/77806372/120090989-cecbe200-c0d4-11eb-9d67-95e056cb623c.png">

* Stock specifics
<img width="1026" alt="Screen Shot 2021-05-29 at 11 19 22 PM" src="https://user-images.githubusercontent.com/77806372/120090992-d1c6d280-c0d4-11eb-9324-9bc8c9f37ea8.png">





## Architecture/Technology
* Will use alphavantage API to fetch historical information about stocks, in order to chart said data.
* Pending approval of request, will use barchart.com API key to generate unusual option activity for a specified listing.
* Chart.js/D3.js to create data visualization. 
  * Chart.js libary requires less work on my end (con), for example, a legend is build by default. Would allow for simple implementation of data visualization (pro). Chart.js would fulfill all my needs, such as the ability to create standard charts (line, bar, pie) (pro)
  * D3.js would allow more interactivity (pro), but would require a good amount of time to learn and implement (con), such as creating my own legends through code. Features are better suited for more complex data visualization, which I do not anticipate requiring (con)
* Canvas will be used for data visualization with Chart.js. D3.js would require canvas and SVG
* Axios package to make API requests. 


## Implementation Timeline
* Day 1: Chart.js/Fetching Data from API Endpoints
  * Fetching data about all listings (to ensure search functionality), and individual listings (to ensure single listing view functionality). 
  * Learn and implement a basic line chart using chart.js library.
  * Fetching and displaying a single listing and all associated data. 
* Day 2: Search Functionality
  * Search bar present.
  * Using search API endpoint, data will be returned by user input.
  * Create logic and functionality that presents and autocompletes search bar similtaneous to user input.
  * Debounce functionality.
* Day 3: Data Visualization: 
  * Extracting data, linking it to the charting library, presenting it in a clean, concise manner. 
  * Creation of FAQ/info modal that explains the site and brings everything together.


## Bonus Features/Future Direction
### Bonus MVP 1: Technical Analysis
  * Implement basic TA tools such as bollinger bands, relative strength index, exponential and simple moving averages.

### Bonus MVP 2: Real-time Data
  * Use websockets to access realtime data. This is contingent on API keys that allow multiple requests. 
  
### Bonus MVP 2: Options Flow
  * The ability to display unusual options activity (based on a pre-decided calculation of open-interest vs. volume on the particular derivative). 
  * 
### Bonus MVP 3: Help Functionality
  * Every statistic and chart has a hover-over area that allows individuals to learn more about the significance of that particular component. For example, if a page displays a stock's 52-week high (quite trivial example), on hover, a display would appear that explains what 52 week high is, its useage, etc. 

  
### Stretch/Future Features
* Increase complexity and interactivity of graphs, different display options (ie: pie chart if applicable).
* Buy/sell signals based on technical analysis - will have to figure out how to convert data into functionality without hard-coding.
