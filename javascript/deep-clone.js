function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) {
    return null;
  }

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  if (typeof obj !== "object") {
    return obj;
  }

  if (hash.has(obj)) {
    return hash.get(obj);
  }

  const resObj = Array.isArray(obj) ? [] : {};

  hash.set(obj, resObj);

  Reflect.ownKeys(obj).forEach((key) => {
    resObj[key] = deepClone(obj[key], hash);
  });

  return resObj;
}

// 方式一，最常用的神拷贝
function deepClone1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 方式二
function deepClone2(obj) {
  var target = {};
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === "object") {
        target[key] = deepClone(obj[key]);
      } else {
        target[key] = obj[key];
      }
    }
  }
  return target;
}

// 方式三 通过Object.create方式
function deepClone3(obj) {
  const deep = Object.create(Object.getPrototypeOf(obj)); //  或者使用obj.__proto__
  const propsName = Object.getOwnPropertyNames(obj); // 获取对象上的所有自有属性，组成一个数组
  console.log(`自有属性组成的数组`, propsName);
  propsName.forEach((propKey) => {
    const desc = Object.getOwnPropertyDescriptor(obj, propKey); // 方法返回指定对象上一个自有属性对应的属性描述符
    console.log(`自有属性对应的属性描述符:`, desc);
    Object.defineProperty(deep, propKey, desc);
  });
  return deep;
}

const obj = {
  name: "张三",
  age: 30,
  getJob: function () {
    return "coder";
  },
  fav: ["打球", "唱歌"],
  son: {
    name: "张三分",
    age: 12,
  },
};
// const deepObj = { ...obj };
// deepObj.son.name = "李四";
// console.log(deepObj);
// console.log(obj);

const deepObj = deepClone(obj);
console.log(deepObj);

// const deepObj = deepClone1(obj);
// console.log(deepObj);
// console.log(deepObj.getJob());
