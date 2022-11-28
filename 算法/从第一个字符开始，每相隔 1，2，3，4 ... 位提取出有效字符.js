/**
 * 实现一个简单的栅格密码翻译方法。
 * 从第一个字符开始，每相隔 1，2，3，4 ... 位提取出有效字符
 *
 * 入参格式参考：
 * const origin = "i3aasmc5gbtgf3aqw3yvt0louehmzs4ywioaqscvrgytn";
 *
 * 出参格式参考：
 * const result = "iambatman";
 * 0 2 5 9 14 20
 *
 * @param {string} pwd
 * @return {string}
 */
const origin = "i3aasmc5gbtgf3aqw3yvt0louehmzs4ywioaqscvrgytn";

function decrypt(pwd) {
  /**
   * 此处写代码逻辑
   */
  let newStr = pwd[0]
  let num = 0
  for (let i = 0; i < pwd.length; i++){
    num += i + 2
    if(num > pwd.length) return newStr
    newStr += pwd[num]
   }
   return newStr
}
console.log(decrypt(origin))
