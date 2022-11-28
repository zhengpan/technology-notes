# 原生js实现数组扁平化 (es6 ==> Array.flat())

## 方案一：利用闭包 + 递归 实现数组扁平化
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

## 方案二：loadsh里提供的flat()