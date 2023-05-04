import React, { useState } from 'react'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo';
import Button from '../../components/ui/Button';
import FixedLayout from '../../components/FixedLayout';
import PopupAddTodo from './components/PopupAddTodo';
import todoStore from '../../store/TodoStore';

const TodoListPage = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  return (
    <>
      <FilterTodo />
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
          <TodoList />
        </div>
      </div>
      {isShow && <PopupAddTodo isShow={isShow} setIsShow={setIsShow} addTodo={todoStore.add} />}
    </>
  )
}

export default TodoListPage