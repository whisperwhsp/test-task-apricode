import React, { HTMLProps, forwardRef } from 'react';
import classes from './InputText.module.scss';

interface IProps extends HTMLProps<HTMLInputElement> { }

const InputText = forwardRef<HTMLInputElement, IProps>(({ type = 'text', className, ...props }, ref) => {
  return (
    <input type={type} className={`${classes.input} ${className}`} {...props} ref={ref} />
  )
})

export default InputText