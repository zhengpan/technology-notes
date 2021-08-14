class Family {
  constructor() {}

  _age = 18;

  get age() {
    return this._age;
  }

  set age(value) {
    this._age = value;
  }
}
const fa = new Family();

fa.age = 20;

console.log(fa.age);

module.exports = Family;
