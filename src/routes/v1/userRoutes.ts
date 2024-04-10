import { Router } from 'express'
import userController from '../../controllers/userController'
import Middleware from '../../middleware'
import { tryCatch } from '../../utils/response'

const router = Router()

router.get('/list', Middleware.verifyToken, tryCatch(userController.getAllUsers))

router.get('/profile', Middleware.verifyToken, tryCatch(userController.getProfile))

router.get('/find/:user_id', Middleware.verifyToken, tryCatch(userController.getUserByID))

export default router
