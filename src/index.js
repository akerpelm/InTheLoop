import "./styles/index.scss";
import './scripts/search'
import './scripts/ticker_info'
import './scripts/ticker_chart'
import './scripts/ticker_chart_2'





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

