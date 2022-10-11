// 本质上是一个使用闭包的高阶函数的实现

function add (a,b) {
  console.log('function add calling...')
  return a + b;
}

function memorize (fn) {
  const dep = {}
  return function () {
    // console.log([].join.call(arguments,'|'));
    const key = rest.join('|')
    dep[key] || (dep[key] = fn(...rest));
    return dep[key]
  }
}
const mAdd = memorize(add);

console.log(mAdd(1,2))
console.log(mAdd(1,2))