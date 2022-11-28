var list = [
  { title: "xxxx", level: 0 },
  { title: "xxxx", level: 0 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 2 },
  { title: "xxxx", level: 2 },
  { title: "xxxx", level: 3 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 0 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 0 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 0 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 1 },
  { title: "xxxx", level: 2 },
  { title: "xxxx", level: 0 },
];

var toTree = (list, level = 0) =>
  list.reduce(
    (acc, cur, idx, arr) => (
      cur.level == level &&
        acc.push({
          title: cur.title,
          level: cur.level,
          items: toTree(list.slice(idx + 1).map(
              (item, _, array) => (item.level == level && (array.length = 0), item)
            ),level + 1),
        }), acc),
  []);
console.log(JSON.stringify(toTree(list)));

// function arrayToJson(list) {
//   const length = list.length;
//   let result = [];
//   for (let i = 0; i < length; i++) {
//     //为0直接压入
//     if (list[i].level == 0) {
//       result.push({ title: list[i].title, items: [], level: list[i].level });
//     } else {
//       //压入发生在结果数组尾端，取尾端最高级对象
//       let obj = result[result.length - 1];
//       //若level大于1则循环赋值，找到应该被加入的items数组
//       if (list[i].level > 1) {
//         for (let j = 0; j < list[i].level - 1; j++) {
//           // 通过遍历，取每一层最后的对象里的items里的最后一项赋值给obj
//           //应被加入的items数组位于上一级items的末尾
//           obj = obj.items[obj.items.length - 1];
//           console.log(obj);
//         }
//       }
//       //此时无论level为1或是大于1，都已经找到了对应的items，push即可
//       obj.items.push({ title: list[i].title, items: [], level: list[i].level });
//     }
//   }
//   return result;
// }

// let a = arrayToJson(list);
// console.log(a);
