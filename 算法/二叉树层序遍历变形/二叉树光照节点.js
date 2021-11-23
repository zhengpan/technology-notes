// var tree = {
//   value: 1,
//   left: {
//     value: 2,
//     left: {
//       value: 4,
//     },
//   },
//   right: {
//     value: 3,
//     left: {
//       value: 5,
//       left: {
//         value: 7,
//       },
//       right: {
//         value: 8,
//       },
//     },
//     right: {
//       value: 6,
//     },
//   },
// };
var tree = {
  value: 3,
  left: {
    value: 9,
  },
  right: {
    value: 20,
    left: {
      value: 15,
      left: {
        value: 16,
      },
    },
    right: {
      value: 7,
    },
  },
};

//     3
//     /\
//    9  20
//       /\
//      15 7
//      /
//     16
//  输出 [3,20,7,16]

const leverOrder = function (root) {
  if (!root) {
    return [];
  }
  const queue = [root];
  const res = [];

  while (queue.length) {
    var lastVal = null;
    for (let i = queue.length; i > 0; i--) {
      const node = queue.shift();
      lastVal = node.value;
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    if (lastVal) {
      res.push(lastVal);
    }
  }
  return res;
};
const result = leverOrder(tree);
console.log(result);
