# 1. Redux是什么
`Redux`是一个状态管理库，它本身和`React`并没有什么关系。

# 2. 使用Redux进行一次简单的状态管理
`Redux`用一个较为抽象的概念规范了数据修改的行为。

`Redux`为每个应用定义了一个且仅有一个`Store`，而每个`state`则以对象的形式存储再这颗树中，唯一可以改变`state`的方法就是触发`action`。

## 2.1 编写action
`action`其实就是一个`JavaScript`的对象，它描述了操作的要点，就像下面这样：
~~~JavaScript
const INCREMENT = {
  type: 'INCREMENT'
};

const ADD_TODO = {
  type: 'ADD_TODO'，
  content: '学习Redux'
};
~~~
可以看到上面的代码仅仅定义了两个`JavaScript`对象，并没有什么特别的地方。

## 2.2 编写reducer
如同2.1所说的，`action`只是一个`JavaScript`对象，很显然它并不能了解到应该如何修改`store`里的`state`，因此我们需要一种处理器来响应`action`并修改`store`里的`state`。

遍写`reducer`也很简单，`reducer`是一个纯函数。

> **纯函数的要点**：当使用两次一样的参数进行输入时，纯函数的返回结果是可期的，即返回同一个结果，通常ajax请求，Math.random()，new Date()等函数都会使函数变成一个非纯函数。

`reducer`函数应该有两个参数：状态的初始值和`action`。`reducer`根据`action`中的`type`来进行对应的逻辑处理并返回新的`state`。

~~~JavaScript
const initState = { count: 0 };
const incrementReducer = (state = initState, action) => {
  switch (action.type) {
    case: 'INCREMENT':
      return { ...state, count: state.count + 1 }；
    default:
      return state；
  }
}
~~~
在上面的`reducer`里，我们接收状态初始值和`action`作为参数，并描述了`action.type`的相关处理逻辑，最后返回了`state`，我们需要注意如下几个要点：
- `reducer`是一个纯函数，对于同样的参数它只会返回同一个结果
- 返回一个`state`（请注意，你不应该修改`stat`e，而是应该使用上述`ES6`扩展语法返回一个新的`state`）

到这里，一个`reducer`就遍写完了，它会响应`action`并对返回新的`state`给`store`，接下来我们将触发`reducer`。

## 2.3 使用store
编写完`action`和`reducer`以后，我们需要创建`store`。
~~~JavaScript
import { createStore } from 'redux';

const store = createStore(incrementReducer);
~~~
从`Redux`库中导出`createStore`，并将`reducer`函数作为参数传递，即可创建`store`。

接下来我们可以使用`store`进行状态读取和修改，我们可以使用`getState()`方法来获取到`store`中的`state`：
~~~JavaScript
cosole.log(store.getState().count);
~~~
然后我们可以使用`dispatch`来修改`state`，`dispatch`接收`action`作为参数，如下所示：
~~~JavaScript
store.dispatch({ type: 'INCREMENT' })
console.log(store.getState().count);

store.dispatch({ type: 'INCREMENT' })
console.log(store.getState().count);

store.dispatch({ type: 'INCREMENT' })
console.log(store.getState().count);
~~~
当然，我们还可以使用发布订阅的模式使得每次修改`state`时都能执行对应的逻辑：
~~~JavaScript
const unsubscribe = store.subscribe(() => {
  console.log(`当前的count是${store.getState().count}`)
})；

store.dispatch({ type: 'INCREMENT' })；
store.dispatch({ type: 'INCREMENT' })；
store.dispatch({ type: 'INCREMENT' })；

unsubscribe();
~~~
如上代码订阅了`state`中的`count`，每当该值发生变化，都会自动执行方法体内的输出语句。另外，该方法会返回一个用于取消订阅的方法，在我们完成了对应逻辑后，我们应该取消当前订阅状态。

# 3. 总结一下
如上的示例中其实已经包含了`Redux`修改数据的基本流程，在`Redux`应用中，我们应该构建树状结构的状态树来管理状态。关于使用`Redux`管理应用状态，还有以下技巧可以参考。
- 封装方法返回`action`或直接在方法内`dispatch`对应的`action`。
- 合理设计`action`的数据结构。
- 使用`reducer`处理多个`action`。
- 拆分多个`reducer`并使用`combineReducers`将多个`reducer`合并为一个。
