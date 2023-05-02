import { observer } from 'mobx-react-lite';
import React from 'react';
import todoStore from '../../../../store/TodoStore';
import classes from './TodoList.module.scss';
import TodoItem from './components/TodoItem';

const TodoList = observer(() => (
  <div className={classes.todoList}>
    {todoStore.todoList.length ? todoStore.todoList.map((todo) => {
      return (
        <TodoItem
          todo={todo}
          toggle={() => todoStore.toggleComplete(todo)}
          remove={() => todoStore.removeById(todo.id)} key={todo.id}
        />
      )
    }) : (
      <div>Todo list is empty</div>
    )}
  </div>
)
)

export default TodoList