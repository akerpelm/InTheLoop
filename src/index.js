import "./styles/index.scss";
import "./scripts/search";
import { modalInformation } from "./scripts/modal";
import { onInput } from './scripts/search'
import * as Util from "./scripts/util";

document.querySelector(".header").innerHTML = `
<div class="header-btns">
<button id="help-modal-btn">Wiki</button>
<button id="search-btn">Demo</button>
</div>
<div id="help-modal" class="modal">
<div class="modal-content">
<span class="modal-close">&times;</span>
<div class="modal-information"></div>
</div>
</div>
<div class="header-logo-div">
      <a href="https://www.linkedin.com/in/alexander-kerpelman-22587584/" target="_blank">
      <i class="fab fa-linkedin"></i>
      </a>
      <a href="https://github.com/akerpelm" target="_blank">
      <i class="fab fa-github">     
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

const demoText = document.querySelector(".input");
const demoWriter = "Energy Fuels";
let idx = 1;

document
  .querySelector("#search-btn")
  .addEventListener("click", () => setInterval(writeText, 200));

const writeText = () => {
  if (idx <= demoWriter.length) {
    demoText.value = demoWriter.slice(0, idx);
    demoText.innerHTML = `<p>${demoText.value}</p>`
    idx++;    
    demoText.addEventListener("change", Util.debounce(onInput));
    
  }
};




let tabButtons = document.querySelectorAll(
  ".tab-container .tab-button-container button"
);
let tabPanels = document.querySelectorAll(".tab-container .tab-panel");

export const showPanel = (idx) => {
  tabPanels.forEach((panel) => {
    panel.style.display = "none";
  });
  tabPanels[idx].style.display = "block";
};

showPanel(0);

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

{
  //hamburger
  /* <section class="p-menu1">
<nav id="navbar" class="navigation" role="navigation">
<input id="toggle1" type="checkbox" />
<label class="hamburger1" for="toggle1">
<div class="top"></div>
<div class="meat"></div>
<div class="bottom"></div>
</label>

<nav class="menu1">
    <a>LinkedIn</a>
    <a>GitHub</a>
    <a>Instagram</a>
</nav>
</section> */
}

//good
// const debounce = (cb) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       // cb(...args);
//       cb.apply(null, args);
//     }, 500);
//   };
// };

//best
// const debounce = (cb, delay = 1000) => {
//   let timeoutId;
//   return (...args) => {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       cb.apply(null, args);
//     }, delay);
//   };
// };

//bad
//debounced!!!!
// let timeoutId;
// const onInput = (e) => {
//   if (timeoutId) {
//     clearTimeout(timeoutId);
//   }
//   timeoutId = setTimeout(() => {
//     fetchData(e.target.value);
//   }, 1000);
// };

//set timeout with clear timeout on input
