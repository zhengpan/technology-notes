var list1 = [
  { id: 1, code: '1', name: '111'},
  { id: 2, code: '2', name: '2222'},
  { id: 3, code: '3',  name:'333'},
]
var list2 = [
  { id: 4, code: '4', name: '444' },
  { id: 5, code: '5', name: '555' },
]
Object.assign(list1, list2);
console.log(list1)