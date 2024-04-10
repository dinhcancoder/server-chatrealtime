import { TodoAttributes } from '../db/models/Todo'

export interface Todo extends TodoAttributes {}

export type TodoInput = Omit<Todo, 'todo_id' | 'completed' | 'createdAt' | 'updatedAt'>

export type TodoUpdate = {
  todo_name?: string
  description?: string
  completed?: boolean
}
