# 1. 为什么使用React Redux?
`Redux`是一个状态管理工具，`React`组件虽然具备内部状态管理的机制，但在复杂项目场景下，状态的复用会变的很困难（为了实现状态复用，我们难免会使用一些方式对状态进行提升或传递，越来越复杂的数据流最终使得状态的管理失控，我们无法预估到哪一个状态在什么时刻会发生变化）。

`Redux`模式下提供了一个非常好的思路，即：只有`dispatch`一个`action`才可以修改状态，所有的状态修改最终都返回给`store`，然后再有`store`进行分发，这样的数据流相对而言就清晰了很多。

# 2. 使用React Redux
要在`React`中使用`Redux`，我们只需要掌握两个`API`。

## 2.1 Provider
`Provider`并不是`Redux`的概念，在`React Context API`中提到`Provider`组件会订阅`Context`中的值，在其值每一次发生变化后都能够重渲染消费该值的组件，此处我们需要将`Redux`章节中提到的`store`传递给`Provider`作为`value`就像下面这样：
~~~jsx
import { createStore } from'redux';
import Reducer from'./stores';

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
~~~

## 2.2 connect
当我们在提到上述`Provider`时，应该就不难想到`Redux`使用了`Context`将`store`注入到整个组件树中，事实上到这里其实我们就可以使用我们编写好的`Reducer`和`action`进行状态管理了，不过`React Redux`为我们提供了更便捷的方法使我们能够以`React`的方式来调用`store`中的`state`与`dispatch`方法。

`connect`是一个返回高阶组件的函数，因此我们很容易了解到使用`connect`的一个基本形态：
~~~jsx
import React from 'react';

const MyComponent = () => <>.....</>

export default connect()(MyComponent);
~~~
`connect`接收两个参数`mapStateToProps`和`mapDispatchToProps`，它们都是函数，命名没有要求，但它们应该返回一个对象，该对象分别描述了`Redux store`中的`state`与组件的映射关系、`Redux dispatch`与组件的映射关系。两者最终都会映射到`props`中。
~~~jsx
const mapStateToProps= state => {
  return {
    list: state.todolist.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: content => dispatch({ type: 'ADD_TODO_ITEM', content })
  }
}
~~~
上面的例子分别遍写了`mapStateToProps`和`mapDispatchToProps`函数，当我们把这两个函数作为参数传递给`connect`后，便可以在组件中以`props`的形式调用`list`参数和`addItem`方法。
~~~jsx
import React, { useRef } from'react';
import { connect } from'react-redux';
import TodoItem from'./todoItem';

const TodoList = props => {

  const inputEl = useRef(null);
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      props.addItem(inputEl.current.value);
      inputEl.current.value = '';
    }
  }

return (
  <>
    <input type='text' ref={inputEl} onKeyDown={handleKeyDown} />
    {props.list.map(item => <TodoItem key={Math.random()} content={item} /> )}
  </>
  )
}

const mapStoreToPorps = state => {
  return {
    list: state.todolist.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: content => dispatch({ type: 'ADD_TODO_ITEM', content })
  }
}

export default connect(mapStoreToPorps, mapDispatchToProps)(TodoList);
~~~
以上代码演示了如何使用`connect`将`state`与`dispatch`映射进组件。