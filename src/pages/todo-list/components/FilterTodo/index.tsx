import React from 'react';
import classes from './FilterTodo.module.scss';
import Button from '../../../../components/ui/Button';

const FilterTodo = () => {
  return (
    <div className={classes.filterTodo}>
      <h5>ФИЛЬТРЫ</h5>
      <div className={classes.btnGroup}>
        <Button type='button'>all</Button>
        <Button type='button'>done</Button>
        <Button type='button'>undone</Button>
      </div>
    </div>
  )
}

export default FilterTodo