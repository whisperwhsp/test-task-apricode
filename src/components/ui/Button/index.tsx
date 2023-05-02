import React, { HTMLProps } from 'react';
import classes from './Button.module.scss';

interface IProps extends HTMLProps<HTMLButtonElement> {
  type: 'button' | 'submit';
  variant?: 'primary' | 'danger' | 'success';
  loading?: boolean;
  children: React.ReactNode;
};

const Button = ({ children, variant = 'primary', className = '', loading = false, ...props }: IProps) => {
  const classNameByVariant = classes[`btn-${variant}`];

  return (
    <button
      className={`${classes.btn} ${classNameByVariant} ${className}`}
      {...props}
    >
      {!loading ? children : 'loading...'}
    </button>
  )
}

export default Button