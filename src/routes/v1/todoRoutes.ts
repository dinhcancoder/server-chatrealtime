import { Router } from 'express'
import { tryCatch } from '../../utils/response'
import todoController from '../../controllers/todoController'

const router = Router()

router.get('/list/:user_id', tryCatch(todoController.fetchAllTodosByUserID))

router.post('/add', tryCatch(todoController.addNewTodo))

router.put('/update/:todo_id', tryCatch(todoController.updateTodo))

router.delete('/delete/:todo_id', tryCatch(todoController.deteleTodo))

router.post('/search', tryCatch(todoController.searchTodo))

export default router
