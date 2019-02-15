const obj = {foo: 123};
covert(obj)


function covert(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(internalValue)
        return internalValue
      },
      set(v) {
        internalValue = v;
      }
    })
  })
}