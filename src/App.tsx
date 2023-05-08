import React, { createContext } from 'react';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import TodoListPage from './pages/todo-list';
import AuthPage from './pages/auth';
import './styles/style.scss';
import AuthRequired from './components/layouts/AuthRequired';
import userStore from './store/UserStore';
import TodoStore from './store/TodoStore';

const todoStore = new TodoStore();

export const TodoStoreContext = createContext(todoStore);


const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/',
    element: <AuthRequired />,
    loader: () => {
      if (!userStore.isAuth) {
        return redirect('/auth');
      }
      return null;
    },
    children: [
      {
        index: true,
        loader: async () => {
          if (userStore.isAuth) {
            return await todoStore.getAll();
          }
          return null;
        },
        element: (
          <TodoStoreContext.Provider value={todoStore}>
            <TodoListPage />
          </TodoStoreContext.Provider>
        )
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
