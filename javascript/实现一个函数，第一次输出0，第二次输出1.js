let num = 1;
const count = function () {
  let num = 2
  return function () {
    // if (num === 1) {
    //   num = 0;
    // } else {
    //   num = 1;
    // }
    return num;
  }
}
console.log(count()())
num = 3;
console.log(count()())