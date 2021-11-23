const render = (key, val) => {
  console.log(`SET key=${key} val=${val}`);
};

const defineReactive = (obj, key, val) => {
  reactive(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      render(key, val);
    },
  });
};

const reactive = (obj) => {
  // 递归的终止条件
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    for (let item in obj) {
      defineReactive(obj, item, obj[item]);
    }
  }
};

const data = {
  a: 1,
  b: 2,
  c: {
    c1: {
      af: 999,
    },
    c2: 4,
  },
};

reactive(data);

// 输出
data.a = 5;
data.b = 7;
data.c.c2 = 4;
data.c.c1.af = 121;
