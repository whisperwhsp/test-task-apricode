import React, { useState } from 'react';
import { AxiosResponse } from 'axios';
import classes from './FilterTodo.module.scss';
import Button from '../../../../components/ui/Button';
import { FilteredType, ITodo } from '../../../../models/todo';

interface IProps {
  getFilteredTodoListByCompleted: (filterType: FilteredType) => Promise<AxiosResponse<ITodo>>;
}

const FilterTodo = ({ getFilteredTodoListByCompleted }: IProps) => {
  const [activeType, setActiveType] = useState<FilteredType>('all');

  const handleClick = (filterType: FilteredType) => (e: React.MouseEvent) => {
    getFilteredTodoListByCompleted(filterType).then(() => {
      setActiveType(filterType);
    });
  }

  return (
    <div className={classes.filterTodo}>
      <h5>FILTERS</h5>
      <div className={classes.btnGroup}>
        {(['all', 'done', 'undone'] as FilteredType[]).map((filteredType) => (
          <Button
            type='button'
            disabled={activeType === filteredType}
            onClick={handleClick(filteredType)}
          >
            {filteredType}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default FilterTodo