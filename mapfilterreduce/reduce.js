const arr = [1, 2, 3, 4, 15];

const res = arr.reduce((acc, curr, i, arr) => {
  acc += curr;
  return acc;
}, 0);
//test
console.log(res);

//arr.reduce((acc,curr,i,arr)=>{},initialvalue)

Array.prototype.myReduce = function (cb, intialValue) {
  let accu = intialValue;
  for (let i = 0; i < this.length; i++) {
    accu = accu ? cb(accu, this[i], i, this) : this[i];
  }
  return accu;
};

const polyres = arr.myReduce((acc, num, i, arr) => {
  acc += num;
  return acc;
}, 2);

console.log(polyres);
