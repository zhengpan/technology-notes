class EventEmitter {
  constructor() {
    this.arr = {}
  }
  // 监听
  on (name,fn) {
    this.arr[name]?this.arr[name].push(fn):this.arr[name] = [fn]
  }
 // 注销
  off (name,fn) {
    if (this.arr[name]) {
      if (fn) {
        this.arr[name] = this.arr[name].filter(o => o !== fn)
      } else {
        delete this.arr[name]
      }
    }
  }
  // 只触发一次
  once (name, fn) {
    this.arr[name] = fn;
  }
  // 触发
  emit (name, params) {
    if (Array.isArray(this.arr[name])) {
      this.arr[name].forEach(fn => {
        fn(params)
      });
    } else {
      this.arr[name](params);
      off(name);
    }

  }
}