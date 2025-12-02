var once = function (fn) {
  let init = 0;
  return function (...args) {
    if (init == 0) {
      init++;
      return fn(...args);
    } else {
      init++;
      return undefined;
    }
  };
};
