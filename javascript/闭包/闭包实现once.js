function once (fn) {
  // 代码实现
}

function add (a, b) {
  console.log(a + b);
}

let testA = once(add);
let testB = once(add);


testA(1,2) // 打印
testA(3, 4) // 不打印
testA(5, 6) // 不打印

testB(1, 3) // 打印
testB(1,3)  // 不打印