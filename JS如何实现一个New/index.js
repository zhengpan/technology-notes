function Person(name, age, job) {

  return '123';
}

// function myNew() {
//   var constr = Array.prototype.shift.call(arguments); // 获取Person构造函数
//   var obj = Object.create(constr.prototype); // 创建一个新的对象，原型指向构造的原型
//   var result = constr.apply(obj, arguments); // 在obj上执行构造函数，把剩余的参数传递进去，使用一个变量接收构造函数的返回值
//   return result instanceof constr ? result : obj; // 如果返回的是undefined，null以及基本类型的时候，都会返回新的对象；而只有返回对象的时候，才会返回构造函数的返回值。 ps:new 返回this
// }

function create_new (fn,...args){
  // 创建一个新对象，即构造函数的实例
  let obj = {};
  // 2、新对象原型指向构造函数原型对象
  obj.__proto__ = fn.prototype;
  // 3、将构建函数的this指向新对象
  const result = fn.apply(obj,args);
  // 4、根据构建函数返回类型作判断，如果是原始值则被忽略，如果是返回对象，需要正常处理
  return result instanceof Object?result:obj;
}


const person = create_new(Person, '郑攀', 30, 'web developer')

console.log(person)

console.log(person.__proto__ === Person.prototype);   // true