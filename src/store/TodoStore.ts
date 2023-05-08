import { action, makeAutoObservable } from "mobx";
import { FilteredType, ITodo } from "../models/todo";
import axios, { AxiosResponse } from "axios";

interface ITodoStore {
  isLoading: boolean;
  todoList: ITodo[];
  add: (description: string) => Promise<AxiosResponse<ITodo>>;
  remove: (todo: ITodo) => Promise<AxiosResponse<ITodo>>;
  toggleComplete: (todo: ITodo) => Promise<AxiosResponse<ITodo>>;
  getFilteredTodoListByCompleted: (filteredType: FilteredType) => Promise<AxiosResponse<ITodo[]>>;
}

class TodoStore implements ITodoStore {
  isLoading: boolean = false;
  todoList: ITodo[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async getAll() {
    return axios.get(`${process.env.REACT_APP_API_URL}/todo-list`).then(action((response) => {
      if (response.data) {
        this.todoList = response.data;
        return response.data
      }
      throw new Error('something went wrong');
    })).catch((e) => Promise.reject(e))
  }

  add(description: string) {
    return axios.post<ITodo>(`${process.env.REACT_APP_API_URL}/todo-list`, { description, completed: false })
      .then(action((response) => {
        this.todoList.push(response.data)
        return response;
      }))
      .catch((e) => Promise.reject(e))
  }

  remove(todo: ITodo) {
    return axios.patch<ITodo>(`${process.env.REACT_APP_API_URL}/todo-list/${todo.id}`, {
      ...todo,
      removed: true
    })
      .then(action((response) => {
        if (response.data) {
          this.todoList = this.todoList.filter((item) => item.id !== todo.id);
          return response;
        }
        throw new Error('Something went wrong');
      }))
      .catch((e) => Promise.reject(e));
  }

  toggleComplete(todo: ITodo) {
    return axios.patch<ITodo>(`${process.env.REACT_APP_API_URL}/todo-list/${todo.id}`, {
      ...todo,
      completed: !todo.completed
    })
      .then(action((response) => {
        if (response.data) {
          todo = response.data;
          return response;
        }
        throw new Error('Something went wrong');
      }))
      .catch((e) => Promise.reject(e));
  }

  getFilteredTodoListByCompleted(type: FilteredType) {
    return axios.get(`${process.env.REACT_APP_API_URL}/todo-list/${type}`)
      .then(action((response) => {
        if (response.data) {
          this.todoList = response.data;
          return response;
        }
        throw new Error('Something went wrong');
      }))
      .catch((e) => Promise.reject(e))
  }
}

export default TodoStore;