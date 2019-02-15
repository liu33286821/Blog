let activeUpdate = null;
class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  // 订阅update 函数列表
  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }

  // 所有update函数重新运行。
  notify () {
    this.subscribers.forEach(sub => sub());
  }
}


function observe(obj) {
  Object.keys(obj).forEach(key => {
    let internalValue = obj[key];
    // 每个属性分配一个Dep实例
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get () { // 负责注册订阅
        dep.depend()
        return internalValue
      },
      set(v) { // 负责监听改变
        const changed = internalValue !== v;
        internalValue = v;
        if (changed) dep.notify()
      }
    })
  })
  return obj;
}

function autorun (update) {
  //包裹update函数到 wrappedUpdate函数中。
  // wrappedUpdate 函数执行时 注册和注销自身
  const wrapperUpdate = () => {
    activeUpdate = wrapperUpdate;
    update();
    activeUpdate = null
  }
  wrapperUpdate()
}
