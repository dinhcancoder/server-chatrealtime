import { StatusCodes } from 'http-status-codes'
import models from '../db/models'
import { Todo, TodoInput, TodoUpdate } from '../types/todo.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { Op } from 'sequelize'

class todoService {
  // Lấy danh sách todo bằng user_id
  async fetchAllTodosByUserID(user_id: string) {
    const todos = await models.Todo.findAll({
      where: {
        user_id
      }
    })

    return {
      message: 'Danh sách todo',
      data: {
        todos
      }
    }
  }

  // Thêm mới todo
  async addNewTodo(todo: TodoInput) {
    const [newRole, created] = await models.Todo.findOrCreate({
      where: {
        todo_name: todo.todo_name
      },
      defaults: todo
    })

    if (!created) {
      throw new CustomErrorHandler(StatusCodes.CONFLICT, 'Todo đã tồn tại!')
    }

    return {
      message: 'Thêm todo mới thành công!',
      data: {
        todo: newRole
      }
    }
  }

  // Cập nhật todo
  async updateTodo(todo_id: string, data: TodoUpdate) {
    const todo = await models.Todo.findByPk(todo_id)

    if (!todo) throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Todo không tồn tại!')

    await todo.update(data)

    return {
      message: 'Cập nhật thành công',
      data: {
        todo
      }
    }
  }

  // Xóa todo
  async deteleTodo(todo_id: string) {
    const todo = await models.Todo.findByPk(todo_id)

    if (!todo) throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Todo không tồn tại!')

    await todo.destroy()

    return {
      message: 'Xóa thành công!',
      data: {
        todo
      }
    }
  }

  async searchTodo(todo_name: string, user_id: string) {
    let filterSearchTodo: Todo[] = await models.Todo.findAll({
      where: {
        [Op.and]: [
          {
            user_id
          },
          {
            todo_name: {
              [Op.like]: `${todo_name.toLocaleLowerCase().charAt(0)}%`
            }
          }
        ]
      }
    })

    return {
      message: 'Thành công',
      data: {
        todos: filterSearchTodo
      }
    }
  }
}

export default new todoService()
