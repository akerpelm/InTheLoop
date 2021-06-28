import "./styles/index.scss";
import "./scripts/search";
import { modalInformation } from "./scripts/modal";
import { onInput, onInputTwo } from "./scripts/search";
import * as Util from "./scripts/util";
// import { changeImg } from "./scripts/carousel";
import "./scripts/footer";
import "./scripts/indices";

{
}
document.querySelector(".header").innerHTML = `
<div class="header-btns">
<button id="help-modal-btn">Wiki</button>
<button id="home">Home</button>
<button id="search-btn">Demo</button> 
</div>
<div id="help-modal" class="modal">
<div class="modal-content">
<span class="modal-close">&times;</span>
<div class="modal-information"></div>
</div>
</div>
    <img class="js-itl-logo" src="public/images/ITL_logo.png">

<div class="header-logo-div">
      <a href="https://www.linkedin.com/in/alex-kerpelman/" target="_blank">
      <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/akerpelm/InTheLoop" target="_blank">
      <i class="fab fa-github">     
      </i>
      </a>
      <a href="https://angel.co/u/alex-kerpelman" target="_blank">
      <i class="fab fa-angellist">     
      </i>
      </a>
</div>
`;

const modal = document.querySelector("#help-modal");
const btn = document.querySelector("#help-modal-btn");
const span = document.querySelector(".modal-close");

btn.onclick = () => {
  modal.style.display = "block";
};

span.onclick = () => {
  modal.style.display = "none";
};
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
};

document.querySelector(".modal-information").innerHTML = modalInformation;
//demo

let demoArray = ["PSTH", "PLTR", "UUUU", "BA", "ATOS", "MSFT", "AAPL", "TSLA"];
const demoText = document.querySelector(".input-2");
const demoWriter = demoArray[Math.floor(Math.random() * demoArray.length)];
let idx = 1;

document
  .querySelector("#search-btn")
  .addEventListener("click", () => setInterval(writeText, 100));

const writeText = () => {
  if (idx <= demoWriter.length) {
    demoText.value = demoWriter.slice(0, idx);

    const event = new Event("event");
    demoText.addEventListener("event", Util.debounce(onInputTwo));
    demoText.dispatchEvent(event);
    idx++;
  } else {
    setTimeout(() => (demoText.value = ""), 60000);
  }
};

//menu
{
  /* <div class="carousel-container"> */
}

document.querySelector(".splash").innerHTML = `

</br>
<h2 class="sub-title-1">Take control of your financial literacy. </br>

<h2 class="sub-title-2">Get <span class="sub-title-alt">InTheLoop.</span></h2>
</br>


</div>

`;
document.querySelector(".splash-2").innerHTML = `

<div class="splash-2">
<div class="splash-2-left">

<img class="js-itl-logo-2" src="public/images/ITL_logo.png">

<p>Click the <a class="splash-wiki-link" href="">wiki</a> button to familiarize yourself with the application.</p>

<p>Once ready, search for a ticker using the search bar.</p>

<p>You may search by ticker: (MSFT, APPL), or by name: (Unity Software, Palantir)</p>

</div>

</div>
`;

const wikiLink = document.querySelector(".splash-wiki-link");

wikiLink.addEventListener("mousedown", () => {
  btn.click();
});

let tabButtons = document.querySelectorAll(
  ".tab-container .tab-button-container button"
);
let tabPanels = document.querySelectorAll(".tab-container .tab-panel");

//Tabs
export const showPanel = (idx) => {
  tabPanels.forEach((panel) => {
    panel.style.display = "none";
  });
  tabPanels[idx].style.display = "block";
};

let weekend = ["Sat", "Sun"];
weekend.includes(new Date(Date.now()).toDateString().slice(0, 3))
  ? showPanel(1)
  : showPanel(0);

let tab1 = document.getElementById("tab-btn-1");
tab1.onclick = () => {
  showPanel(0);
};
let tab2 = document.getElementById("tab-btn-2");
tab2.onclick = () => {
  showPanel(1);
};
let tab3 = document.getElementById("tab-btn-3");
tab3.onclick = () => {
  showPanel(2);
};
let tab4 = document.getElementById("tab-btn-4");
tab4.onclick = () => {
  showPanel(3);
};
let tab5 = document.getElementById("tab-btn-5");
tab5.onclick = () => {
  showPanel(4);
};

document.querySelector(".js-itl-logo").addEventListener("click", () => {
  window.location.reload();
});
document.querySelector("#home").addEventListener("click", () => {
  window.location.reload();
});

//Wiki Accordion
document.querySelector("#wiki-search").addEventListener("click", () => {
  document.querySelector(".search-ul").classList.toggle("search-active");
});
document
  .querySelector("#wiki-information-page")
  .addEventListener("click", () => {
    document
      .querySelector(".information-ul")
      .classList.toggle("information-active");
  });
document.querySelector("#wiki-charts").addEventListener("click", () => {
  document.querySelector(".charts-ul").classList.toggle("charts-active");
});
document.querySelector("#wiki-limitations").addEventListener("click", () => {
  document
    .querySelector(".limitations-ul")
    .classList.toggle("limitations-active");
});
document.querySelector("#wiki-learn").addEventListener("click", () => {
  document.querySelector(".learn-ul").classList.toggle("learn-active");
});
document.querySelector("#wiki-future").addEventListener("click", () => {
  document.querySelector(".future-ul").classList.toggle("future-active");
});
