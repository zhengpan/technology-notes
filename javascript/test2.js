class parent {
  name = '哈哈'
  constructor(name) {
    console.log("我是父");
    this.name = name;
  }
  getName () {
    console.log(`my name is ${this.name}`)
  }
}

class child extends parent {
  constructor(props) {
    super(props); // 类似于 parent.prototype.constructor.call(this,props)
    console.log("我是子");
  }
}

const zhengpan = new child('郑攀');

console.log(zhengpan.getName())
