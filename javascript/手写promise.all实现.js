// Promise.all 是一个静态方法，不能挂载到实例上。
Promise.all = function (promiseArray){
    // return promise
    return new Promise((resolve,reject)=>{
        // 参数类型的判断
        if(!Array.isArray(promiseArray)){
            return reject(new TypeError('arguments must be array'))
        }
        const promiseNum = promiseArray.length;
        const res = [];
        let counter = 0;

        for(let i = 0;i<promiseNum;i++){
            // 注意数组元素类型
            Promise.resolve(promiseArray[i]).then((value => {
                counter++;
                // 不能用push,会造成返回数据的顺序混乱
                res[i] = value;
                // 用counter计算，不能用数组长度
                if(counter === promiseNum){
                    resolve(res);
                }
            })).catch(e => {
                reject(e);
            });
        }
    })
}

// 测试
const pro1 = new Promise((res,rej)=>{
    setTimeout(()=>{
      res('1')
    },1000)
})

const pro2 = new Promise((res,rej)=>{
    setTimeout(()=>{
      res('2')
    },2000)
})

const pro3 = new Promise((res,rej)=>{
    setTimeout(()=>{
        res('3')
    },3000)
})

const proAll = Promise.all([pro1,pro2,pro3]);
proAll.then(res => {
    console.log(res);
}).catch(e =>{
    console.log(e)
})