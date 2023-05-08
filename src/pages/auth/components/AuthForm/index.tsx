import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/ui/Button';
import InputText from '../../../../components/ui/InputText';
import userStore from '../../../../store/UserStore';
import { ILoginFormData } from '../../../../models/user';

interface IStateForm {
  error: string | null;
  isLoading: boolean;
}

const fields = {
  login: {
    id: 'login',
    name: 'login',
    defaultValue: '',
    placeholder: 'login',
    required: true
  },
  password: {
    id: 'password',
    type: 'password',
    name: 'password',
    defaultValue: '',
    placeholder: 'password',
    autoComplete: 'on',
    required: true
  }
}

const AuthForm = () => {
  const [state, setState] = useState<IStateForm>({
    error: null,
    isLoading: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setState({
      error: null,
      isLoading: true
    });

    if (!formData.has(fields.login.name) && !formData.has(fields.password.name)) {
      setState((prev) => ({ ...prev, error: 'Некорректные поля' }))
    }

    const loginData = {
      login: formData.get(fields.login.name),
      password: formData.get(fields.password.name)
    }

    await userStore.login(loginData as ILoginFormData)
      .then((response) => {
        if (response.data.success) {
          navigate('/');
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          setState((prev) => ({ ...prev, error: error.response?.data }))
        }
      })
      .finally(() => {
        setState((prev) => ({ ...prev, isLoading: false }))
        form.reset();
      })
  }

  return (
    <Modal isShow setIsShow={() => { }} title='Authorization' withoutCloseButton>
      <form id='login-form' onSubmit={handleSubmit}>
        <div>
          <InputText {...fields.login} />
        </div>
        <div style={{ marginTop: '1.5rem' }}>
          <InputText {...fields.password} />
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