function handleFlat() {
  const newArr = [];
  return function flat(arr) {
    for (let item of arr) {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        newArr.concat(flat(item));
      } else {
        newArr.push(item);
      }
    }
    return newArr;
  };
}
const result = handleFlat()([1, 2, 3, [4, 5], [6, [7, [8]]]]);
console.log(result);
