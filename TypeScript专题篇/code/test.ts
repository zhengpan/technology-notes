/**
 * 枚举
 */

// enum ColorEnum {
//   Red = 1,
//   Green = 2,
//   Blue = 4
// }
// let colorName:ColorEnum = ColorEnum.Green;
// console.log(colorName)

/**
 * 原型上的方法和属性是没有没办法深/浅拷贝的
 */
// function Coo ():void {
//   this.p = 12;
// }
// Coo.prototype.m = function () { console.log('m') }
// let c = new (<any>Coo)();
// const clone = {...c};
// clone.__proto__ = Coo.prototype;
// console.log(clone.m())

/**
 * 使用Extract 和 Exclude 摘取或者排除 联合脸型
 */
// type str = 'A' | 'B' | 'C' | 'D'
// type withA = Extract<str, 'A'>;
// type WithoutA = Exclude<str,'A'>;
// let a: withA = 'A'
// let b: WithoutA = 'B'

/** 使用Pick或者 Omit 摘取或去除 对象里的属性*/
// type user = {
//   name: string,
//   age: number,
//   sex: boolean
// }
// type withName = Pick<user, 'name'>;
// type withOutSex = Omit<user,'sex'>;

// let myAdd: (baseValue: number, increment: number) => number
// myAdd = function(x: number, y: number): number { return x + y; };



// type A = {
//   name:string
// }
// type B = {
//   age:number
// }

// type C = A & B

// let user:C = {
//   name: 'zp',
//   age:32
// }

// type foo = {
//   (age:number):number
// }
// let getAge: foo = (age) => {
//   return age
// }


/** 去除对象里的属性readonly 修饰 */
// type obj =  {
//   readonly name: string,
//   readonly age: number,
//   // [propName: string]: any
// }
// type removeOnly<T> = { -readonly [Key in keyof T]: T[Key] }
// let user: removeOnly<obj> = { name: '郑攀', age: 32 }
// user.name = 'xx'



// function getValue<T extends object, U extends keyof T>(obj:T, key: U) {
//   return obj[key] // ok
// }
// const a = {
//   name: 'huihui',
//   age:22
// }

// console.log(getValue(a,'name'))

// 使用type结合 泛型修饰接口方式约束接口属性为只读
// type readyonlyObj<T> = {
//   readonly [P in keyof T]:T[P]
// }
// type obj =  {
//   a: string,
//   b: string
// }

// let user: readyonlyObj<obj> = {
//   a: '123',
//   b:'456'
// }
// console.log(user)

// 泛型修饰接口描述的函数
// interface ReturnItemFn<T> {
//   (param:T):T
// }
// const returnItem: ReturnItemFn<string> = param => param

// console.log(returnItem('123'))