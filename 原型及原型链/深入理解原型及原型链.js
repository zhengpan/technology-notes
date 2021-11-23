function User(name, passwordHash) {
  this.name = name;
  this.passwordHash = passwordHash;
}

User.prototype.toString = function () {
  return "[User " + this.name + "]";
};

User.prototype.checkPassword = function (password) {
  return hash(password) === this.passwordHash;
};

var u = new User("Lix", "123456");

console.log(Object.getPrototypeOf(u)); // User { toString: [Function], checkPassword: [Function] }

console.log(u.__proto__); // User { toString: [Function], checkPassword: [Function] }

console.log(User.prototype); // User { toString: [Function], checkPassword: [Function] }

// C.prototype用于建立由 new C() 创建的对象的原型。
// Object.getPrototype(obj)是ES5中用来获取obj对象的原型对象的标准方法。
// obj.__proto__是获取obj对象的原型对象的非标准方法。
// 所以一般我们是不会直接访问C.prototype去获取原型对象的，在ES5的环境中，我们使用Object.getPrototype(obj)来获取原型对象，而在不支持ES5的环境中，我们可以考虑用__proto__这样的非标准方法来当做权宜之计，希望各位不明白的同学能牢记这些区别。
