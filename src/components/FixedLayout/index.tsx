import React from 'react';
import classes from './FixedLayout.module.scss';

interface IProps {
  style: React.CSSProperties;
  children: React.ReactNode;
}

const FixedLayout = ({ children, style }: IProps) => {
  return (
    <div className={classes.fixed} style={style}>
      {children}
    </div>
  )
}

export default FixedLayout