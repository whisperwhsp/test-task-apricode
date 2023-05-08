import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import classes from './TodoList.module.scss';
import TodoItem from './components/TodoItem';
import { ITodo } from '../../../../models/todo';
import { TodoStoreContext } from '../../../../App';

interface IProps {
  todoList: ITodo[];
}

const TodoList = observer(({ todoList }: IProps) => {
  const todoStore = useContext(TodoStoreContext);
  return (
    <div className={classes.todoList}>
      {todoList.length ? todoList.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            toggle={() => todoStore.toggleComplete(todo)}
            remove={() => todoStore.remove(todo)}
            key={todo.id}
          />
        )
      }) : (
        <div style={{ textAlign: 'center', fontStyle: 'italic' }}>Todo list is empty</div>
      )}
    </div>
  )
}
)

export default TodoList