const { readFileSync } = require('fs');
const path = require('path');
const { Script } = require('vm');


function my_require (fileName) {
  const fileContent = readFileSync(path.resolve(__dirname, fileName), 'utf-8');
  console.log(`获取文件内容${fileContent}`);
  // 包裹文件内容
  const warpFileContent = `(function(require,module,exports){
    ${fileContent}
  })`
  console.log(`包裹的文件内容${warpFileContent}`)

  const module = {
    exports: {}
  }
  const script = new Script(warpFileContent, {
    filename:'index.js'
  });
  // res为上面 ‘warpFileContent’ 的函数
  const res = script.runInThisContext();
  // 执行这个函数
  console.log(res.toString());
  res(my_require, module, module.exports);
  return module.exports;
}

global.my_require = my_require;
my_require('./index.js');