import React, { useLayoutEffect, useRef } from 'react';
import Modal from '../../../../components/Modal';
import InputText from '../../../../components/ui/InputText';
import Button from '../../../../components/ui/Button';
import classes from './PopupAddTodo.module.scss';

interface IProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  addTodo: (description: string) => void;
}

const fields = {
  description: {
    id: 'description',
    type: 'text',
    name: 'description',
    defaultValue: '',
    placeholder: 'description'
  }
}

const PopupAddTodo = (props: IProps) => {
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    if (formData.has(fields.description.name)) {

      const description = formData.get(fields.description.name);

      props.addTodo(description as string);
      props.setIsShow(false);
    }
  }

  useLayoutEffect(() => {
    if (props.isShow) {
      descriptionRef.current?.focus();
    }
  }, [props.isShow])

  return (
    <Modal isShow={props.isShow} setIsShow={props.setIsShow} title='Add Todo' >
      <form className={classes.popupForm} onSubmit={handleSubmit}>
        <div>
          <InputText {...fields.description} ref={descriptionRef} />
        </div>
        <div>
          <Button type='submit' variant='success'>add todo</Button>
        </div>
      </form>
    </Modal>
  )
}

export default PopupAddTodo