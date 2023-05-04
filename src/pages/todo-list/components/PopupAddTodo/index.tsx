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

const PopupAddTodo = (props: IProps) => {
  const inputDescriptionRef = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (inputDescriptionRef.current) {
      const descriptionValue = inputDescriptionRef.current.value;

      props.addTodo(descriptionValue)
      props.setIsShow(false);
    }
  }

  useLayoutEffect(() => {
    inputDescriptionRef.current?.focus();
  }, [props.isShow])

  return (
    <Modal isShow={props.isShow} setIsShow={props.setIsShow} title='Add Todo' >
      <form className={classes.popupForm} onSubmit={handleSubmit}>
        <div>
          <InputText
            id='description'
            type='text'
            name='description'
            placeholder='write description'
            ref={inputDescriptionRef}
          />
        </div>
        <div>
          <Button type='submit' variant='success'>add todo</Button>
        </div>
      </form>
    </Modal>
  )
}

export default PopupAddTodo