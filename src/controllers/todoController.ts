import { Request, Response } from 'express'
import todoService from '../services/todoService'
import { sendResponseSuccess } from '../utils/response'
import { Todo, TodoInput, TodoUpdate } from '../types/todo.type'

class todoController {
  // Lấy danh sách todo bằng user_id
  async fetchAllTodosByUserID(req: Request, res: Response) {
    const { user_id } = req.params

    const data = await todoService.fetchAllTodosByUserID(user_id)

    sendResponseSuccess(res, data)
  }

  // Thêm mới todo
  async addNewTodo(req: Request, res: Response) {
    const todo: TodoInput = req.body

    const data = await todoService.addNewTodo(todo)

    sendResponseSuccess(res, data)
  }

  // Cập nhật todo
  async updateTodo(req: Request, res: Response) {
    const { todo_id } = req.params
    const dataTodo: TodoUpdate = req.body

    const data = await todoService.updateTodo(todo_id, dataTodo)

    sendResponseSuccess(res, data)
  }

  // Xóa todo
  async deteleTodo(req: Request, res: Response) {
    const { todo_id } = req.params

    const data = await todoService.deteleTodo(todo_id)

    sendResponseSuccess(res, data)
  }

  // Tìm kiếm todo
  async searchTodo(req: Request, res: Response) {
    const { todo_name, user_id }: { todo_name: string; user_id: string } = req.body

    const data = await todoService.searchTodo(todo_name, user_id)

    sendResponseSuccess(res, data)
  }
}

export default new todoController()
