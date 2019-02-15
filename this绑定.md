# this

```this```绑定有5种：
- 默认绑定
- 隐式绑定
- 显示绑定
- new绑定
- 箭头函数绑定

#### 默认绑定

- 独立函数调用，可以把默认绑定看作是无法应用其他规则时的默认规则，this指向全局对象。
- 严格模式，不能将全局对象作用于默认绑定，this会绑定到```undefined```。
只有函数在非严格模式下运行默认绑定才能绑定到全局对象.

```javascript
function f() {
  "use strict";
  console.log(this.a)
}
var a = 2;
f(); // 会报错， 显示当前this下的a未定义

//-----------------

function f1() {
  console.log(this.a);
}
var a = 2;
(function() { // 严格模式下调用函数则不影响默认绑定
  "use strict";
  f1(); // 2
})
```

### 隐式绑定
当函数引用对象的时候，隐式规则会把函数中的this绑定到这个上下文对象。

```javascript
function f() {
  console.log(this.a)
}
var obj = {
  a: 1,
  f
}
obj.f(); //2
```
### 显示绑定

通过```call```和```apply```和ES5的```bind```方法，
区别在于```call```和```apply```是立即执行而```bind```是手动执行。
```javascript
function f() {
  console.log(this.a)
}
var obj = {
  a: 1
}
f.call(a); //1
```

### new绑定

- 在JS种，```构造函数```只是使用```new```操作符时，被调用的普通函数，他们不属于某个类,也不会实例化一个类。
- 包括内置对象函数(```String()/Number()```)在内的所有函数都可以用```new```来调用，这种被称为构造函数使用。
- 实际上并不存在所谓的『构造函数』，只有对于函数的『构造调用』。

使用```new```来调用函数，或者说发生构造函数调用时，会自动执行下面操作。
1. 创建一个新的对象。
2. 这个对象会被执行Prototype连接
3. 这个对象会绑定到函数调用的this
4. 如果函数没有返回其他对象，那么```new```表达式中的函数调用会自动返回这个新对象。


### 箭头函数绑定

```javascript
function f() {
  return (a) => console.log(this.a)
}

var obj = {a: 2}
var obj2 = {a: 3}
var bar = foo.call(obj)
bar.call(obj2) // 2 不是3
```
在上面的代码中，我们可以看到```f()```返回了一个箭头函数，这个箭头函数之后通过```call```把```obj```的this赋值给了foo，
之后又通过```call```赋值给了obj2。 此时你有可能会猜想```console```会打印```2```，但是其实是```3```。

因为在第一次通过```call```来绑定this的时候，箭头函数已经根据第一个```call```绑定this上了，第二次```call```并不会起作用。
始终走向一点**箭头函数的绑定无法被修改。即使是new也不行**