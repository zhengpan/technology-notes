// function Component(){
//   constructor(){
//     this.data = {
//       count:0
//     }
//   }
// }

// Component.prototype.data = {
// 	count : 0
// }

class Component {
  constructor() {
    this.data = { count :0 }
  }
}

const componentA = new Component()
const componentB = new Component()
componentA.data.count = 1;
console.log(componentB.data.count);
