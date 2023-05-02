import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TodoListPage from './pages/todo-list';
import AuthPage from './pages/auth';
import './styles/style.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TodoListPage />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
