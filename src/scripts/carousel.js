//Carousel
let images = [];
const interval = 7000;
let i = 0;

images[0] = "public/images/stock_finance.png";
images[2] = "public/images/aapl_1m.png";
images[1] = "public/images/aapl_screenshot.png";
images[3] = "public/images/aapl_info.png";
images[4] = "public/images/learning.png";

export const changeImg = () => {
  document.slide.src = images[i];
  i < images.length - 1 ? i++ : (i = 0);

  setTimeout(changeImg, interval);
};
window.onload = setTimeout(changeImg, 7000);
