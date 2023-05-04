import React, { useRef, useState } from 'react'
import Modal from '../../../../components/Modal';
import Button from '../../../../components/ui/Button';
import InputText from '../../../../components/ui/InputText';
import axios from 'axios';

interface IStateForm {
  error: string | null;
  isLoading: boolean;
}

const AuthForm = () => {
  const [state, setState] = useState<IStateForm>({
    error: null,
    isLoading: false
  });
  const inputLoginRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (inputLoginRef.current && inputPasswordRef.current) {
      const login = inputLoginRef.current.value;
      const password = inputPasswordRef.current.value;
      setState({
        error: null,
        isLoading: true
      })
      await axios
        .post('http://localhost:3001/login', {
          login,
          password
        })
        .then((response) => {
          if (response.data) {
            if (inputLoginRef.current && inputPasswordRef.current) {
              inputLoginRef.current.value = '';
              inputPasswordRef.current.value = '';
            }
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error) && error.response) {
            setState((prev) => ({ ...prev, error: error.response?.data }))
          }
        })
        .finally(() => {
          setState((prev) => ({ ...prev, isLoading: false }))
        })
    }
  }
  return (
    <Modal isShow setIsShow={() => { }} title='Authorization' withoutCloseButton>
      <form onSubmit={handleSubmit}>
        <div>
          <InputText
            id='login'
            name='login'
            placeholder='login'
            ref={inputLoginRef}
          />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <InputText
            id='password'
            type='password'
            name='password'
            placeholder='password'
            autoComplete='on'
            ref={inputPasswordRef}
          />
        </div>
        {!!state.error && (
          <div style={{ fontSize: '0.8rem', color: 'red' }}>{state.error}</div>
        )}
        <div style={{ marginTop: '1.5rem' }}>
          <Button type='submit' disabled={state.isLoading}>login</Button>
        </div>
      </form>
    </Modal>
  )
}

export default AuthForm