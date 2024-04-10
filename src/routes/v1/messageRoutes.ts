import { Router } from 'express'
import { tryCatch } from '../../utils/response'
import messageController from '../../controllers/messageController'

const router = Router()

router.get('/find/:conversation_id', tryCatch(messageController.getMessagesByConversationID))

router.post('/send-message', tryCatch(messageController.sendMessage))

router.get('/last-message/:sender_id/:receiver_id', tryCatch(messageController.getLatestMessageByConversationID))

export default router
