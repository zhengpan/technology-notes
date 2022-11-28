/*这个字符串中的每个字每出现了多少次*/
var ary = "asasDFGHadDfFFhjkMNJGBHGDsdfghjfghjkdfghjkl";
var obj = {};
var i = 0;

ary1 = ary.toLocaleLowerCase(); //将字符串转为小写

for (i = 0; i < ary1.length; i++) {
  key = ary1[i];

  if (obj[key]) {
    //对象中有这个字母
    obj[key]++;
  } else {
    //对象中没有这个字母,把字母加到对象中
    obj[key] = 1;
  }
}

let str = "";
for (var key in obj) {
  //遍历这个对象
  str += `${key}:${obj[key]} | ` ;
}
console.log(str);
