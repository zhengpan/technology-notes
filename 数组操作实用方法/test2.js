const camelCase = (str) => {
  let newStr = '';
  const splitCharater = str.match(/_|-|\s/)[0];
  const strArr = str.split(splitCharater);
  strArr.forEach((item, index) => {
    if (index === 0) {
      newStr += item.toLocaleLowerCase();
    } else {
      newStr += item.slice(0, 1).toLocaleUpperCase() + item.slice(1);
    }
  })
  return newStr;
}

console.log(camelCase('Foo-Food'))