const obj = {
  count: 0,
  [Symbol.iterator]: () => {
    return {
      next: () => {
        obj.count++;
        if (obj.count <= 10) {
          return {
            value: obj.count,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  },
};

for (let item of obj) {
  console.log(item);
}
