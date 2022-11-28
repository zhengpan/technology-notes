// Promise.all 是一个静态方法，不能挂载到实例上。
Promise.all = function (promiseArray) {

  return new Promise((resolve, reject) => {
    let count = 0;
    let allRes = [];
    let promiseArrayLength = promiseArray.length
    for (let i = 0; i < promiseArrayLength;i++) {
      promiseArray[i].then(val => {
        count++; // 只有单个promise返回后才能++

        allRes[i] = val; //数组下标能保证按顺序插入，不使用push,否则会导致 添加后顺序混乱，因为单个promise是异步,

        if (count === promiseArrayLength) { // 拿到单个promise最后返回计算的count值后才resolve
          console.log(i,promiseArray[i])
          resolve(allRes);
        }
      }).catch(e => {
        reject(e);
      })
    }
  })

}

// 测试
const pro1 = new Promise((res,rej)=>{
    setTimeout(()=>{
      res('1')
    },3000)
})

const pro2 = new Promise((res,rej)=>{
    setTimeout(()=>{
      res('2')
    },2000)
})

const pro3 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res('3')
    },1000)
})

const proAll = Promise.all([pro1, pro2, pro3]);

proAll.then(res => {
    console.log(res);
}).catch(e =>{
    console.log(e)
})