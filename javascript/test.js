
function test (value) {
  console.log('function test is calling',value)
}

let list = [];

function b1 (value) {
  return new Promise((resolve,reject) => {
    console.log('b1 is calling before test');
    resolve(value + 5)
  })

}

function b2 (value) {
  return new Promise((resolve,reject) =>{
    console.log('b2 is calling before test')
    resolve(value * 2)
  })
}

function warped (fn) {
  fn.before = list;
  return function (arg) {
    console.log(arg);
    // item为返回的Promise对象
    [...fn.before, fn].reduce((total, item) => total.then(item), Promise.resolve(arg));
  }
}

const newTest = new warped(test);



list.push(b1);
list.push(b2);
newTest(2);