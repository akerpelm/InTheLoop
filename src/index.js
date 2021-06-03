import "./styles/index.scss";
import "./scripts/search";
import "./scripts/ticker_info";
import "./scripts/ticker_chart";
import "./scripts/ticker_chart_2";
// import './images/ITL_logo.png'

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
}

span.onclick = () => {
  modal.style.display = "none";
}
window.onclick = (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

document.querySelector(".modal-information").innerHTML = `
<p>Welcome to InTheLoop, a web application designed to visualize data about securities listed on major global exchanges. </p>
<p>The goal of the application is to lay out financial data in an inuitive manner, allowing individuals of any financial experience to navigate the application with ease and comfort </p>
<p>Please take a moment to read through this brief walkthrough for a more enjoyable user experience.</p>
</br>
<h2>Major Components</h2>
<li><a href="">Search</a></li>
<li><a href="">Information Page</a></li>
<li><a href="">Charts</a></li>
<li><a href="">Future Direction</a></li>
<li><a href="">Limitations</a></li>
<li><a href="">Contact</a></li>
</ul>
`

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
};

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
