# 原生js实现数组扁平化 (es6 ==> Array.flat())

```js
    function handleFlat() {
      const newArr = []; // 闭包
      return function flat(arr) {
        for (let item of arr) {
          if (Object.prototype.toString.call(item) === "[object Array]") {
            flat(item);
          } else {
            newArr.push(item);
          }
        }
        return newArr;
      };
    }
    const result = handleFlat()([1, 2, 3, [4, 5], [6, [7, [8]]]]);
    console.log(result);
```