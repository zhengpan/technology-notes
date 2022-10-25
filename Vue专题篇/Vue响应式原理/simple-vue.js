const utils = {
  setValue(expr, vm, newValue) {
    vm.$data[expr] = newValue;
  },
  getValue(expr, vm) {
    return vm.$data[expr.trim()];
  },
  model(node, value, vm) {
    const initValue = this.getValue(value, vm);
    console.log(initValue);
    new Watcher(value, vm, (newValue) => {
      this.modelUpdater(node, newValue);
    });
    node.addEventListener("input", (e) => {
      const newValue = e.target.value;
      this.setValue(value, vm, newValue);
    });
    this.modelUpdater(node, initValue);
  },
  text(node, value, vm) {
    // {{xxx}}
    let result;
    if (value.includes("{{")) {
      const matchVal = value.replace(/\{\{(.+?)\}\}/g, "$1");
      new Watcher(matchVal, vm, (newVal) => {
        this.textUpdater(node, newVal);
      });
      // -------2
      result = this.getValue(matchVal, vm);
    } else {
      // v-text="xxx"
      new Watcher(value, vm, (newVal) => {
        this.textUpdater(node, newVal);
      });
      result = this.getValue(value, vm);
    }
    this.textUpdater(node, result);
  },
  on(node, value, vm, eventName) {
    const fn = vm.$options.methods[value];
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  textUpdater(node, value) {
    node.textContent = value;
  },
  modelUpdater(node, value) {
    node.value = value;
  },
};

// 观察者对象类，一个Dom 节点的依赖及更新
class Watcher {
  constructor(expr, vm, callback) {
    this.expr = expr; // key
    this.vm = vm;
    this.callback = callback;
    // 通过getter 对数据进行绑定，标记当前的 watcher

    this.oldValue = this.getOldValue();
  }

  getOldValue() {
    Dep.target = this;
    // 通过getter 读取当前依赖    --------1
    const oldValue = utils.getValue(this.expr, this.vm);
    Dep.target = null;
    return oldValue;
  }

  update() {
    const newValue = utils.getValue(this.expr, this.vm);
    if (newValue !== this.oldValue) {
      this.callback(newValue);
    }
  }
}

// 收集依赖关系，存储观察者， 以发布订阅的形式实现
class Dep {
  constructor() {
    this.collect = [];
  }

  addWatcher(watcher) {
    this.collect.push(watcher);
  }

  notify() {
    this.collect.forEach((watcher) => {
      watcher.update();
    });
  }
}

// 编译模版，解析指令
class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    const fragment = this.compileFragment(this.el);

    this.compile(fragment);
    this.el.appendChild(fragment);
  }

  compile(fragment) {
    const childNodes = Array.from(fragment.childNodes);
    childNodes.forEach((childNode) => {
      if (this.isElementNode(childNode)) {
        // 标签节点 h1/input 读取属性。查看是否有v- 开头的内容
        this.compileElement(childNode);
      } else if (this.isTextNode(childNode)) {
        // 内容文本节点{{msg}} 是否有双括号语法
        this.compileText(childNode);
      }
      if (childNode.childNodes && childNode.childNodes.length) {
        this.compile(childNode);
      }
    });
  }

  compileElement(node) {
    // v-model v-text v-on:click
    const attributes = Array.from(node.attributes);
    attributes.forEach((attr) => {
      const { name, value } = attr;
      if (this.isDirector(name)) {
        // 指令 v-model v-text v-bind v-on:click
        const [, directive] = name.split("-");
        const [compileKey, eventName] = directive.split(":");
        // console.log(directive, value);
        utils[compileKey](node, value, this.vm, eventName);
      } else if (this.isEventName(name)) {
        // @方法执行
        const [, eventName] = name.split("@");
        utils.on(node, value, this.vm, eventName);
      }
    });
  }

  isDirector(name) {
    return name.startsWith("v-");
  }

  isEventName(name) {
    return name.startsWith("@");
  }

  compileText(node) {
    // {{msg}}
    const content = node.textContent;
    const contentReg = /\{\{(.+?)\}\}/;
    if (contentReg.test(content)) {
      utils["text"](node, content, this.vm);
    }
  }

  compileFragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.appendChild(firstChild);
    }
    console.dir(f);
    return f;
  }

  isElementNode(el) {
    return el.nodeType === 1;
  }
  isTextNode(el) {
    return el.nodeType === 3;
  }
}

// 数据劫持
class Observer {
  constructor(data) {
    this.observe(data);
  }

  observe (data) {
    // 递归终止条件
    if (data && typeof data === "object") {
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  defineReactive(obj, key, value) {
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get () {
        debugger
        console.log("$data getter", key, value);
        const target = Dep.target;
        target && dep.addWatcher(target);
        return value;
      },
      set: (newVal) => {
        if (value === newVal) {
          return;
        }
        console.log("$data setter", key, value,newVal);
        this.observe(newVal);
        value = newVal;
        dep.notify();
      },
    });
  }
}

class Vue {
  constructor(options = {}) {
    this.$el = options.el;
    this.$data = options.data;
    this.$options = options;

    // 触发this.$data.xx和模版绑定，为属性添加getter/setter，以此实现响应式
    new Observer(this.$data);
    // 处理模版部分，将模版中使用的data部分的变量和模版绑定起来
    new Compiler(this.$el, this);

    // 把vue data里的 属性转发到 vue实例上去
    this.proxyData(this.$data);
  }

  // 为vm实例上的属性添加getter/setter,通过this.xx 更改 this.$data.xx的结果
  proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          console.log('proxyData get',key,data[key])
          return data[key];
        },
        set(newVal) {
          console.log('proxyData set',key,newVal)
          data[key] = newVal;
        },
      });
    });
  }
}
