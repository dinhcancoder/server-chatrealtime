import { Router } from 'express'
import roleRoutes from './roleRoutes'
import commonRoutes from './commonRoutes'
import userRoutes from './userRoutes'
import conversationRoutes from './conversationRoutes'
import messageRoutes from './messageRoutes'
import todoRoutes from './todoRoutes'
import { API_V1 } from '../../constants/apiPaths'

const router = Router()

router.use(API_V1.common, commonRoutes)
router.use(API_V1.role, roleRoutes)
router.use(API_V1.user, userRoutes)
router.use(API_V1.conversation, conversationRoutes)
router.use(API_V1.message, messageRoutes)
router.use(API_V1.todo, todoRoutes)

export default router
