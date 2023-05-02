import React from 'react';
import classes from './FilterTodo.module.scss';

const FilterTodo = () => {
  return (
    <div className={classes.filterTodo}>
      <h5>FilterTodo</h5>
      <div style={{ marginTop: '1rem' }}>
        <select>
          <option value="all">all</option>
          <option value="done">done</option>
          <option value="undone">undone</option>
        </select>
      </div>
    </div>
  )
}

export default FilterTodo