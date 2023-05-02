import React, { HTMLProps } from 'react';


const InputCheckbox = (props: HTMLProps<HTMLInputElement>) => {
  return (
    <input {...props} type='checkbox' />
  )
}

export default InputCheckbox