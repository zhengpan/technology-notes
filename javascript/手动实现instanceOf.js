
/**
 * 手动实现instanceOf
 * @param {*} source 实例对象
 * @param {*} targe 构造函数
 */
function copyInstanceOf (source, targe) {
  // 基本数据类型以及null直接返回false
  if (!['function', 'object'].includes(typeof source) || source === null) {
    return false
  }
  let proto = Object.getPrototypeOf(source);
  while (true) {
    // 找到原型链尽头，还没找到
    if (proto === null) {
      return false
    }
    // 找到相同的原型对象
    if (proto === targe.prototype) {
      return true
    }
    // 继续找下一层的原型
    proto = Object.getPrototypeOf(proto) // 或者使用 proto.__proto__
  }
}