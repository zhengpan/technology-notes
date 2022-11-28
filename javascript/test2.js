const list1 = [{
  id: 1, code: 1, name: 111
}, {
  id: 2, code: 1, name: 222
}, {
  id: 3, code: 2, name: 333
},
{
  id: 4, code: 4, name: 444
}]

const list2 = [
  {
    id: 1, name: 'aaa'
  },
  {
    id: 5, name: 555
  },
  {
    id: 6, name: 666
  },
]


const mergeByProperty = (target, source, prop) => {
  source.forEach(sourceElement => {
    sourceElement.code = sourceElement.code ? sourceElement.code : 1
    let targetElement = target.find(targetElement => {
      return sourceElement[prop] === targetElement[prop];
    })
    targetElement ? Object.assign(targetElement, sourceElement) : target.push(sourceElement);
  })
}

mergeByProperty(list1, list2, 'id')
console.log(list1);