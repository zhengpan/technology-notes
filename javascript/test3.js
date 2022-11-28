// function shortenArray(arr) {
//   // 处理边界
//   if (!Array.isArray(arr) || arr.length <= 1) {
//     return arr;
//   }

//   // 记录结果
//   const result = [];

//   // 记录连续数字的开始位置
//   let start = 0;
//   // 记录连续数字的结束位置
//   let last = 0;

//   function pushArr(arrStart, arrEnd) {
//     if (arrStart === arrEnd) {
//       result.push(arr[arrStart].toString());
//     } else {
//       result.push(`${arr[arrStart]}->${arr[arrEnd]}`);
//     }
//   }

//   // 一次循环获取结果
//   for (let i = 1; i < arr.length; i++) {
//     const temp = arr[i];
//     if (arr[last] + 1 === temp) {
//       last = i;
//     } else {
//       pushArr(start, last);
//       start = i;
//       last = i;
//     }
//   }

//   // 处理剩余数据
//   pushArr(start, last);

//   return result;
// }



function shortenArray (arr) {
  let result = [];
  let startIndex = 0;
  let endIndex = 0;

  function outputStr (arrStart, arrEnd) {
    if (arrStart === arrEnd) {
      result.push(arr[arrStart].toString())
    } else {
      result.push(`${arr[arrStart]}->${arr[arrEnd]}`)
    }
  }
  for (let i = 1; i < arr.length; i++) {
    let curVal = arr[i];
    if (curVal === arr[endIndex]+1) {
      endIndex = i;
    } else {
      outputStr(startIndex,endIndex);
      startIndex = i;
      endIndex = i;
    }
  }
  outputStr(startIndex,endIndex)
  return result;
}
console.log(shortenArray([1, 2, 3, 4, 6, 7, 9, 13, 15])); // ['1->4','6->7','9','13','15']