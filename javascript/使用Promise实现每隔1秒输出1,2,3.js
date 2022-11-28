let arr = [1, 2, 3]

arr.reduce((prevPromiseFn,curVal) => {
  return prevPromiseFn.then(() => {
    return new Promise((resolve,reject) => {
      setTimeout(() => { resolve(curVal);console.log(curVal) },1000)
    })
  })
},Promise.resolve())