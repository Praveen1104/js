const arr = [1, 2, 3, 4];

const res = arr.filter((num, i, arr) => {
  return num > 2;
});

console.log(res);
//arr.filter((num,i,arr))
//poyfill
Array.prototype.myFilter = function (cb) {
  let temp = [];

  for (let i = 0; i < this.length; i++) {
    // temp.push(cb(this[i], i, arr)); this will return true false value
    if (cb(this[i], i, this)) {
      temp.push(this[i]);
    }
  }
  return temp;
};

const polyres = arr.myFilter((num, i, arr) => {
  return num < 3;
});

console.log(polyres);
