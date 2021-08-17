interface FuncWithAttachment {
  (param: string): boolean;
  someProperty: number;
}
const testFunc: FuncWithAttachment = { "param": true, someProperty: 2 };

// const result = testFunc('mike'); // 有类型提醒
// testFunc.someProperty = 3;