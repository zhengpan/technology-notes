class EventBus {

  constructor() {

  }
  task = {}
  on (type,fn) {
    if (!this.task[type]) {
      this.task[type] = [];
    }
    this.task[type].push(fn);
  }
  emit (type, ...arg) {
    if (!this.task[type]) {
      return
    }
    if (Array.isArray(this.task[type])) {
      this.task[type].forEach(fn => {
        fn(...arg)
      });
    } else {
      this.task[type](...arg);
      this.off(type)
    }
  }
  once (type,fn) {
    this.task[type] = fn;
  }
  off (type,fn) {
    if (this.task[type]) {
      if (fn) {
        // 利用filter实现删除
        this.task[type] = this.task[type].filter(o => o.toString() !== fn.toString())
      } else {
        delete this.task[type]
      }
    }
  }
}

// 实例化事件总线
const events = new EventBus();
// 监听自定义事件
// events.on('my-event', (value) => {console.log(value+'~wow~');});
events.once('my-event', (value) => {console.log(value);});
// 触发事件
// events.emit('my-event', 'helloworld');
x
// 注销事件
// events.off('my-event', (value) => {console.log(value);})

events.emit('my-event', 'zp 你好');
events.emit('my-event', 'zp 你好a');