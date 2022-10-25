function myDeepClone (data, hash = new WeakMap()) {
  if (data === null) {
    return null
  }
  if (data instanceof Date) {
    return new Date(data)
  }
  if (data instanceof RegExp) {
    return new RegExp(data)
  }
  if (typeof data !== 'object') {
    return data;
  }
  if (hash.has(data)) {
    console.log('何时走')
    return hash.get(data);
  }
  const resData = Array.isArray(data) ? [] : {}

  hash.set(data, resData);

  Reflect.ownKeys(data).forEach(key => {
    resData[key] = myDeepClone(data[key],hash)
  })

  return resData;
}

const source = { a: { c: 3, d: 4 }, b: 2, f: [6, 7, 8] }

const obj1 = myDeepClone(source)
console.log(obj1)
