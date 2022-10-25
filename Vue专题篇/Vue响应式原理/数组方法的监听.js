const render = (action, ...args) => {
  console.log(`Action = ${action}, args = ${args.join(",")}`);
};

const arrPrototype = Array.prototype; // 保存数组的原型
const newArrPrototype = Object.create(arrPrototype); // 基于原来的数组原型创建了一个新的对象


["push", "pop", "shift", "unshift", "sort", "splice", "concat"].forEach(
  (methodName) => {
    newArrPrototype[methodName] = function () {
      console.log(`执行原有数组的方法:${arguments}`)
      // 执行原有数组的方法
      arrPrototype[methodName].call(this, ...arguments);
      // 触发渲染
      render(methodName, ...arguments);
    };
  }
);
const reactive = (objData) => {
  // 递归的终止条件
  if (Object.prototype.toString.call(objData) === "[object Array]") {
    // 把新定义的原型对象指向objData.__proto__
    objData.__proto__ = newArrPrototype;
  }
};

const data = [1, 2, 3, 4];

reactive(data);

// 输出
data.push(5); // Action = push, args = 5
data.splice(0, 2); // Action = splice, args = 0,2
