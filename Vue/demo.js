class Dep { // 主题对象
  constructor () {
    this.subs = []; //订阅者列表
  }

  notify () {//主题对象通知订阅者
    //遍历所有的订阅者，执行订阅者提供的更新方法
    this.subs.forEach(sub => sub.update())
  }
}

class Sub { //订阅者
  constructor(x) {
    this.x = x;
  }

  update () { // 订阅者更新
    this.x *= this.x;
    console.log(this.x)
  }
}

var pub = { // 发布者。
  publish: function() {
    dep.notify()
  }
}

var  dep = new Dep(); //主题实例对象。

Array.prototype.push.call(
  dep.subs,
  new Sub(1),
  new Sub(2),
  new Sub(3)
);

pub.publish()