// bind原理文章 https://www.cnblogs.com/echolun/p/12178655.html
Function.prototype.myBind = function (content) {
  var fn = this;
  //第0位是this，所以得从第一位开始裁剪
  var args = Array.prototype.slice.call(arguments, 1);

  // 创建一个中介函数
  var fn_ = function () { }
  var bound =  function () {
    //二次调用我们也抓取arguments对象
    var params = Array.prototype.slice.call(arguments);
    // 通过constructor判断调用方式，为true表示通过new调用，this指向实例，否则为obj
    fn.apply(this.constructor === fn ? this : content, args.concat(params))
    // this.constructor === this
  }
  // 这里之所以创建一个中介函数，是因为bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效
  // 中介函数的原型指向fn(this)的原型
  fn_.prototype = fn.prototype;
  // 中介函数的实例指向bound的原型
  bound.prototype = new fn_();

  return bound;
}

var z = 2;

var obj = {
  z:1
}

function fn (x,y) {
  console.log(x+y+this.z);
}

var bound = fn.myBind(obj,1)
bound(2);
