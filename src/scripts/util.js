export const debounce = (cb) => {
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

// export default debounce