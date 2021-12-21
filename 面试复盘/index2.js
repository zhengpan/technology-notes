new Promise((resolve,reject)=>{
    console.log('outer promise start');
    resolve();
    console.log('outer promise done');

}).then(()=>{
    new Promise((resolve,reject)=>{
        console.log('inner promise start');
        resolve('done');
    }).then(param => {
        console.log('inner then1',param);
    }).then(param => {
        console.log('inner then2',param);
    })
    return true;
})
.then(params => {
    console.log('outer then2',params);
    throw Error('error')
}).catch(params =>{
    console.log('outer catch',params);
})

// 正确答案：
// outer promise start
// outer promise done
// inner promise start
// inner then1 done
// outer then2 true
// inner then2 undefined
// outer catch Error: error