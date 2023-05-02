import React from 'react'
import TodoList from './components/TodoList'
import FilterTodo from './components/FilterTodo'
import Button from '../../components/ui/Button'

const TodoListPage = () => {
  return (
    <div className='container'>
      <h1>TodoListPage</h1>
      <div style={{ marginTop: '3rem' }}>
        <FilterTodo />
      </div>
      <div style={{ marginTop: '3rem' }}>
        <Button type='button'>+ add todo</Button>
      </div>
      <div style={{ marginTop: '3rem' }}>
        <TodoList />
      </div>
    </div>
  )
}

export default TodoListPage