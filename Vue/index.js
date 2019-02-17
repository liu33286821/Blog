let activeUpdate = null;
class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  // 订阅update 函数列表
  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
      console.log(this.subscribers)
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
        dep.depend(); //走depend   添加到订阅列表
        return internalValue
      },
      set(v) { // 负责监听改变
        const changed = internalValue !== v; // 判断原始值
        internalValue = v;
        if (changed) dep.notify(); //如果修改值了，更改需要重新运行
      }
    })
  })
  return obj;
}

function autorun (update) {
  //包裹update函数到 wrappedUpdate函数中。
  // wrappedUpdate 函数执行时 注册和注销自身
  const wrapperUpdate = () => {
    console.log('进入autorun')
    activeUpdate = wrapperUpdate; //包裹函数  等待放入到订阅中，等待执行。
    update(); // 把包裹函数放入到
    activeUpdate = null
  }
  wrapperUpdate()
}

const dep = new Dep();
let obj = {
  a: 1,
  b: 2
}
observe(obj)
autorun(() => {
  dep.depend();
});
//注册订阅者 输出updated

//通知改变  输出updated
dep.notify()