import "./styles/index.scss";
import "./scripts/search";
// import "./scripts/ticker_info";
import { modalInformation } from "./scripts/modal";
// import "./scripts/ticker_chart";
// import "./scripts/ticker_chart_2";

document.querySelector(".header").innerHTML = `
<button id="help-modal-btn">Wiki</button>
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
    // removeHash();
  }

};

document.querySelector(".modal-information").innerHTML = modalInformation;

// let anchor = document.querySelector("#top-btn");
// let removeHash = () => {
//   setTimeout(() => {
//     window.location.href = window.location.origin;
//   }, 500);
// };
// anchor.onclick = () => {
// };

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
