// @ts-ignore
var testFunc = {};
// @ts-ignore
var result = testFunc('mike'); // 有类型提醒
testFunc.someProperty = 3;
console.log(result, testFunc);
