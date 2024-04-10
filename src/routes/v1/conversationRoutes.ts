import { Router } from 'express'
import { tryCatch } from '../../utils/response'
import conversationController from '../../controllers/conversationController'

const router = Router()

router.get('/list', tryCatch(conversationController.getAllConversations))

router.get('/find/:user_id', tryCatch(conversationController.getConversationByUserID))

router.post('/add', tryCatch(conversationController.addNewConversation))

export default router
