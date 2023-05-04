import React, { useEffect, useRef } from 'react';
import classes from './Modal.module.scss';
import Button from '../ui/Button';

interface IProps {
  title: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  withoutCloseButton?: boolean;
  children: React.ReactNode;
}

const Modal = ({ withoutCloseButton = false, ...props }: IProps) => {
  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modalWrapper = modalWrapperRef.current;

    if (modalWrapper) {
      modalWrapper.addEventListener('scroll', (e) => {
        e.stopPropagation();
      })
    }
  }, [])

  if (!props.isShow) {
    return null;
  }

  return (
    <div className={classes.modalWrapper} ref={modalWrapperRef}>
      <div className={classes.modal}>
        <div className={classes.title}>
          <div>
            {props.title}
          </div>
          {!withoutCloseButton && <div>
            <Button type='button' onClick={() => props.setIsShow(false)}>close</Button>
          </div>}
        </div>
        <div className={classes.body}>{props.children}</div>
      </div>
    </div>
  )
}

export default Modal