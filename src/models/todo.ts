export type FilteredType = 'all' | 'done' | 'undone'

export interface ITodo {
  id: number;
  description: string;
  completed: boolean;
  removed: boolean;
}