import React, { useContext, useState } from 'react'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo';
import Button from '../../components/ui/Button';
import FixedLayout from '../../components/ui/layouts/FixedLayout';
import PopupAddTodo from './components/PopupAddTodo';
import { observer } from 'mobx-react-lite';
import { TodoStoreContext } from '../../App';

const TodoListPage = observer(() => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const todoStore = useContext(TodoStoreContext);

  const addTodo = todoStore.add.bind(todoStore);
  const getTodoFilteredTodoListByCompleted = todoStore.getFilteredTodoListByCompleted.bind(todoStore);

  return (
    <>
      <FilterTodo getFilteredTodoListByCompleted={getTodoFilteredTodoListByCompleted} />
      <div className='container'>
        <FixedLayout
          style={{
            bottom: '2rem',
            right: '2rem'
          }}
        >
          <Button
            type='button'
            style={{
              padding: '1rem',
              borderRadius: '50%',
              boxShadow: '0px 0px 4px 4px #2d2f48'
            }}
            onClick={() => setIsShow(true)}
          >
            <span className="material-symbols-outlined">
              add
            </span>
          </Button>
        </FixedLayout>
        <div style={{ margin: '1.5rem 0 10rem' }}>
          <TodoList todoList={todoStore.todoList} />
        </div>
      </div>
      {isShow && <PopupAddTodo isShow={isShow} setIsShow={setIsShow} addTodo={addTodo} />}
    </>
  )
})

export default TodoListPage