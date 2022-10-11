const count = (function () {
  let num = 1;
  return function () {
    if (num === 1) {
      num = 0;
    } else {
      num = 1;
    }
    return num;
  }
})()

console.log(count())
console.log(count())
console.log(count())
console.log(count())