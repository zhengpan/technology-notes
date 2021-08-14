# js如何实现一个New

---

## 一、创建一个新的空的对象，很简单，代码如下：

```js
function myNew() {
    var obj = new Object();
}
```

## 第二步
所谓将构造函数的作用域赋给新对象，就是给这个新对象构造原型链，链接到构造函数的原型对象上，从而新对象就可以访问构造函数中的属性和方法。

构造函数就是我们传入的第一个参数。由于arguments是类数组，我们不能直接使用shift方法，我们可以使用call来调用Array上的shift方法，获取constr：

```js
var constr = Array.prototype.shift.call(arguments);
```
之后，我们把obj的原型指向构造函数的原型对象上：
```js
obj.__proto__ = constr.prototype;
```

等等，从第1步到第2步，是不是有点奇怪，我们模拟new，但是在代码当中又使用到了new这个关键字？其实还有一种方法可以创建Object对象，那就是Object.create()。

对于var obj = new Object()来说，执行的时候obj.__proto__是指向Object.prototype的。如果使用 Object.create(object, objectProps)这种方法，第一个参数就是要创建的对象的原型，如果赋值为null，则得到的obj没有任何原型；在我们的代码当中，我们想要新对象使用构造函数的原型，那么只需要：

```js
var obj = Object.create(constr.prototype);
```
我们现在的代码如下所示：
```js
function myNew() {
  var constr = Array.prototype.shift.call(arguments);
  var obj = Object.create(constr.prototype);
}
```
好了，第二步也完成！

## 第三步
执行构造函数中的代码（为这个新对象添加属性）。很简单，如果了解call和apply如何使用，易如反掌

```
constr.apply(obj, arguments);
```

## 第四步
如果构造函数有返回值，则返回；否则，就会默认返回新对象。

首先，要获取这个返回值，我们让：

```js
var result = constr.apply(obj, arguments);
```
但是，new这个关键字，并不是所有返回值都原封不动地返回的。如果返回的是undefined，null以及基本类型的时候，都会返回新的对象；而只有返回对象的时候，才会返回构造函数的返回值。

因此，我们要判断result是不是object类型，如果是object类型，那么就返回result，否则，返回obj。

```js
return result instanceof Object? result : obj;
```
好啦，现在我们完整程序如下：

```js
function myNew() {
  var constr = Array.prototype.shift.call(arguments);
  var obj = Object.create(constr.prototype);
  var result = constr.apply(obj, arguments);
  return result instanceof Object? result : obj;
}
```


示例代码
```js
function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
       console.log(this.name)
    }
}

var person = new Person('Nicholas', 29, 'Front-end developer'); 
// var person = myNew(Person, 'Nicholas', 29, 'Front-end developer');

console.log(person.name) // Nicholas
person.sayName();        // Nicholas
console.log(person.__proto__ === Person.prototype);   // true

var person = myNew (Person,'Nicholas', 29, 'Front-end developer')
```