var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    },
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7,
      },
      right: {
        value: 8,
      },
    },
    right: {
      value: 6,
    },
  },
};

//     1
//     /\
//    2  3
//   /   /\
//  4   5  6
//     /\
//    7  8
//  输出 [[1],[2,3],[4,5,6],[7,8]]

const leverOrder = function (root) {
  if (!root) {
    return [];
  }
  const queue = [root];
  const res = [];

  while (queue.length) {
    const temp = []; // 每一层需要显示的数据
    for (let i = queue.length; i > 0; i--) {
      const node = queue.shift();
      temp.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    res.push(temp);
  }
  return res;
};
const result = leverOrder(tree);
console.log(result);
