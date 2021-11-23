function markObservable() {}

let user = {};

user = markObservable(user);

user.observer(() => {
  console.log(`${action} key=${key} value=${value || ""}`);
});

user.name = "John"; // SET key=name value=John
console.log(user.name); // GET key=name value=John // John
delete user.name; // DELETE key=name value=
