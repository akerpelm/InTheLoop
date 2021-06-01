import "./styles/index.scss";
import './scripts/search'
import './scripts/ticker'





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

//test company info
// const fetchData = async () => {
//   const response = await axios.get("https://www.alphavantage.co/query", {
//     params: {
//         function: "OVERVIEW",
//         symbol: "BA",
//         apikey: "XC4SUZCTKM8LVK1Y",
//     },
//   });

//   console.log(response.data);
// };

// fetchData();
