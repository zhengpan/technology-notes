// interface FuncWithAttachment {
//   [propName: string]: any;
//   someProperty: number;
// }
// const testFunc: FuncWithAttachment = {
//   someProperty: 123,
//   param: 'aaa'
// };

// const result = testFunc('mike'); // 有类型提醒
// testFunc.someProperty = 3;

interface myArray<T> {
  [n:number]:T
}
let b:myArray<number> = [1,2,3,4]