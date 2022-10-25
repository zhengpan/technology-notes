const compose = (...fns) => {
  return (x) => {
    return fns.reduceRight((totalValue,currentFun) => currentFun(totalValue),x)
  }
}

const add = (value) => {
  return value + 1;
}

const multiply = (value) => {
  return value * 2
}

const moreFun = compose(multiply,add)

console.log(moreFun(2));


