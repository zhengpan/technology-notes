


const arr = [3,456,2,4,7,8,9,53,34,86]

let temp;
for (let i = 0; i < arr.length - 1; i++) {
  for (let j = 0; j < arr.length - i - 1; j++) { // 这里减去i 是因为不需要再对比已经排过序的号码了
    if (arr[j] > arr[j + 1]) {
      temp = arr[j];
      arr[j] = arr[j + 1]
      arr[j + 1] = temp;
    }
  }
}
console.log(arr);