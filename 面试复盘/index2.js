new Promise((resolve,reject)=>{
    console.log('outer promise start');
    resolve();
    console.log('outer promise done');

}).then(()=>{
    new Promise((resolve,reject)=>{
        console.log('inner promise start');
        resolve('done');
    }).then(param => {
        console.log('inner then1', param);
    }).then(param => {
        console.log('inner then2',param);
    }).then(param => {
      console.log('inner then3',param);
  })
  // return true;
})
.then(params => {
  console.log('outer then2',params);
}).then(params => {
  console.log('outer then3',params);
  throw Error('error')
}).catch(params =>{
    console.log('outer catch',params);
})

// 正确答案：
// 理解：js主线程优先执行 promise里的同步代码，resolve以后，添加then里的回调至微任务队列。
// 异步队列里的微任务先进先出，不断then的过程，其实就是不断往异步队列添加微任务
// outer promise start
// outer promise done
// inner promise start
// inner then1 done
// outer then2 true
// inner then2 undefined
// outer catch Error: error