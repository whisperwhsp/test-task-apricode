import React from 'react';
import { ITodo } from '../../../../../../models/todo';
import classes from '../../TodoList.module.scss';
import { observer } from 'mobx-react-lite';
import InputCheckbox from '../../../../../../components/ui/InputCheckbox';
import Button from '../../../../../../components/ui/Button';

interface IProps {
  todo: ITodo,
  toggle: () => void;
  remove: () => void;
}

const TodoItem = observer(({ todo: { id, description, completed }, toggle, remove }: IProps) => (
  <div className={classes.todoItem}>
    <div className={classes.checkbox}>
      <InputCheckbox
        name={'completed'}
        defaultChecked={completed}
        onChange={toggle}
      />
    </div>

    <div className={classes.description}>
      {description}
    </div>

    <div className={classes.btn}>
      <Button
        type='button'
        onClick={remove}
        variant='danger'
      >
        <span className="material-symbols-outlined">
          close
        </span>
      </Button>
    </div>
  </div>
)
)

export default TodoItem