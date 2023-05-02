import { makeAutoObservable } from "mobx";
import { ITodo } from "../models/todo";

interface ITodoStore {
  isLoading: boolean;
  todoList: ITodo[];
  add: (todo: ITodo) => void;
  removeById: (id: number) => void;
  toggleComplete: (todo: ITodo) => void;
}

class TodoStore implements ITodoStore {
  isLoading: boolean = false;
  todoList: ITodo[] = [
    { id: 1, description: '', completed: false },
    { id: 2, description: '', completed: false },
    { id: 3, description: '', completed: false },
    { id: 4, description: '', completed: false },
    { id: 5, description: '', completed: false },
    { id: 6, description: '', completed: false },
    { id: 7, description: '', completed: false },
    { id: 8, description: '', completed: false },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  add(todo: ITodo) {
    this.todoList.push(todo);
  }
  removeById(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id)
  }
  toggleComplete(todo: ITodo) {
    todo.completed = !todo.completed;
  }
}

export default new TodoStore();