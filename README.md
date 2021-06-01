Finance App **change this title**

## What?
* A data visualization tool for New York Stock Exchange (NYSE) listed companies. 
* Initially, visualization will include historical price action for a stock (with the potential to show daily highs/lows, **add here**!!!)
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
