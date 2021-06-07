export const modalInformation = `<div>
  <div class="wiki-header">
    <p class="wiki-header-title">Welcome to <span class="wiki-title">InTheLoop</span>, a web application designed to visualize data about securities listed on major global exchanges. </p>
    <p>The goal of the application is to lay out financial data in an inuitive manner, allowing individuals of any financial experience to navigate the application with ease and comfort </p>
    <p>Please take a moment to read through this brief page for a more enjoyable user experience.</p>
  </div>
  <div id="wiki-top" class="wiki-components"><h4 class="components">Major Components</h4>

      <ul class="wiki-contents">
        <li ><a class="first-child-content" href="#wiki-search">Search</a></li>
        <li><a href="#wiki-information-page">Information Page</a></li>
        <li><a href="#wiki-charts">Charts</a></li>
        <li><a href="#wiki-limitations">Limitations</a></li>
        <li><a href="#wiki-learn">Learning the Ropes</a></li>
        <li><a href="#wiki-future">Future Direction</a></li>
        <li><a href="#wiki-contact">Contact</a></li>
      </ul>
  </div>

  <div class="wiki-body">

  <h4 id="wiki-search">Search</h4>
    <ul>
      <li>Search for any globally traded secuirity.</li>
      <li>All securities will show on the search bar, but some will not display complete information see <a href="#wiki-information">information page</a>, below.</li>
      <li>An autopopulate feature has been implemented, allowing for search by ticker (ie: "MSF" or "MSFT" will autopopulate ), or by name ("Micr" or "Microsoft" will autopopulate)
      <li>A dropdown will appear, from which, a single click will lead to an information pageabout the security.
    </ul>
    <a id="top-btn" href="#wiki-top">Back to Top</a>


  <h4 id="wiki-information-page">Information Page</h4>
    <ul>
      <li>Once a security has been selected, two views will populate. An information page (left) and pertinent <a href="#wiki-charts">charts</a> (right)</li>
      <li>The first subsection is an overview of the company</li>
      <li>The second subsection is a list of a small number of metrics. For more information about these metrics, refer to <a href="#wiki-learn">Learning the Ropes</a></li>
      <li>The final subsection is a limited list of technical indicators. This is a work in progress. For more information about this section, see <a href="#wiki-future">Future Direction</a></li>
    </ul>
    <a id="top-btn" href="#wiki-top">Back to Top</a>


  <h4 id="wiki-charts">Charts</h4>
    <ul>
      <li>The charts on the right are displayed from smallest to largest timeframe.</li>
      <li>They display price action of the selected security in the timeframe listed.</li>
      <li>Hovering over a point on the chart will display a date/time as well as the open price at the specified time.</li>
      <li>The charts, in order, are daily (1m intervals), 1 week (1h intervals), monthly (1h intervals), yearly(8h intervals), and max (1w interval).</li>
      <li>The "Max" chart shows the price action as far back as data was available in the creation of this site.</li>
    </ul>
    <a id="top-btn" href="#wiki-top">Back to Top</a>

  <h4 id="wiki-"limitations">Limitations</h4>
  <ul>
      <li>A few limitations were idenitfied during the creation of this application:</li>
      <li class="first-lim">Currently, the maximum API calls per minute is 8. At least one is made when searching for a ticker, and currently 5 are made to retrieve information for each individual chart. This means that no more than one request can be made per minute.
      <li>The APIs used to gather data are free versions, meaning there is a limit to the requests that can be made to data per day. As a result, the application does not show realtime data, after-hours trading, or all of the information that is desired on the chart (trading volume, TA). This would involve more requests than allowed on a free plan of the APIs.</li>
      <li>Certain ETFs and non-US listed securities do not display data, resulting in blank information pages and charts. Error handling has been implemented to show an error message if this occurs.</li>
      <li>Charts do not account for historical stock splits, a chart may show what appears to be a sudden correction/price decline.</li>
      <li>The application is intended to be lightweight, frontend-only. There is no database to store the data, which would reduce the number of API calls being made.</li>
      <li>The "Max" chart shows the price action as far back as data was available in the creation of this site.</li>
      <li>The metrics and technicals sections of a listing's information page are limited to what was present on a listing's API response. This is not indicative of the 'best' metrics, or ones that are valued by the author.</li>
    </ul>
    <a id="top-btn" href="#wiki-top">Back to Top</a>

    <h4 id="wiki-learn">Learning the Ropes</h4>
    <h5 class="disclaimer">Disclaimer: the author if this page has no background in finance, rather, has made of it a hobby and an interest of his. All information, while verified, should be cross-referenced with a reputable source. The metrics and technicals sections of a listing's information page are limited to what was present on a listing's API response. This is not indicative of the 'best' metrics, or ones that are valued by the author.</h5>

    <ul>
    <li class="ltr-li">Market Capitalization:</br><span class="ltr-span"> the market value of a company, calculated by multiplying the current share price by the number of shares outstanding.</span></li>
    <li class="ltr-li">Price-to-Earnings (P/E) Ratio:</br><span class="ltr-span"> measures the current price of one share relative to it's earnings-per-share (EPS)</span></li>
    <li class="ltr-li">Price/Earnings-to-Growth (PEG) Ratio:</br><span class="ltr-span"> similar to PE ratio, the PEG ratio is calculated by dividing PE ratio / expected earnings growth. Expected earnings growth is generally calculated using analyst estimates. PEG ratio provides a more accurate reflection of the stock's true value</span></li>
    <li class="ltr-li">Forward Price-to-Earnings (PE) Ratio:</br><span class="ltr-span"> similar to PE, Forward PE uses forecasted EPS to estimate earnings growth relative to today's share price. By itself, this ratio is not particularly useful, and may be inaccurate due to biases in those who estimate EPS</span></li>
    <li class="ltr-li">Price-to-Book (PB) Ratio:</br><span class="ltr-span"> compares a listing's market capitalization to it's book value. Book value is the difference between total assets and total litabilities. PB ratio is calculated by dividing a company's price per share by its book value per share. This tool is commonly used by value investors, and a PB ratio < 1.0 may indicate a good investment opportunity.</span></li>
    <li class="ltr-li">Shares Outstanding:</br><span class="ltr-span"> the number of shares being held by all shareholders (including insiders and insitutions). The number may fluctuate if the company issues additional shares, or if employees exercise employee stock options (ESO). </span></li>
    <li class="ltr-li">Shares Float:</br><span class="ltr-span"> the total number of shares that are available to trade. This is derived by subtracting the number of restricted stock from the number of outstanding shares. Restricted stock may include stock held by insiders during a lock-up period after a company's initial public offering (IPO).</span></li>
    <li class="ltr-li">Shares Short:</br><span class="ltr-span">Number of shares shorted. Short selling (shorting) is a bearish investment strategy that speculates the decline of a stock. Investors borrow shares to then sell, hoping for downward price action. This may also be done by investors to hedge a long position.</li>
    <li class="ltr-li">Insider Ownership:</br><span class="ltr-span"> insiders are members of a company who could have access to information that may impact price action before it becomes publicly available. Insider Ownership indicates what percentage of shares outstanding are owned by insiders.</span></li>
    <li class="ltr-li">Institutional Ownership:</br><span class="ltr-span"> the percentage of shares outstanding held by large entities that manage funds on others' behalf.</span> </li>
    <li class="ltr-li">52 Week High/Low:</br><span class="ltr-span">The highest and lowest prices at which a security has traded over the past year (52 weeks).</span></li>
    <li class="ltr-li">50-Day Moving Average (50d MA):</br><span class="ltr-span"> the average price of one share over the last 50 days. This is a useful tool of technical analysis, when suplemented with other tools, as it may indicate support or resistance levels, or an imminent break out.</span></li>
    </ul>
    <a id="top-btn" href="#wiki-top">Back to Top</a>


    <h4 id="wiki-future">Future Direction</h4>
    <ul>
    <li>Add a premium API key to allow for more requests. As a result, more information will become available for display on the information page as well as the chart.</li>
    <li>Include trading volume, candlestick charts as view options for charts.</li>
    <li>Make more API requests for technical analysis tools.</li>
    <li>Include ability to overlap technical analysis with current chart.</li>
    <li>Display a listing's option chain, unusual option activity (API contingent).</li>
    </ul>
    <h4 id="wiki-contact">Contact</h4>
    <ul class="wiki-links">
    <li class="wiki-links"><a  href="https://www.linkedin.com/in/alex-kerpelman/" target="_blank">LinkedIn</a></li>
    <li class="wiki-links"><a  href="https://github.com/akerpelm/finance-app" target="_blank">GitHub</a></li>
    <li class="wiki-links"><a  href="mailto:test@test.com">Email</a></li>
    </ul>

<a href="#wiki-top">Back to Top</a>
  </div>

</div>
`;
