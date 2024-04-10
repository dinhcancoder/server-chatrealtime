import { Request, Response } from 'express'
import { ConversationInput } from '../types/conversation.type'
import conversationService from '../services/conversationService'
import { sendResponseSuccess } from '../utils/response'

class conversationController {
  // Lấy danh sách các cuộc trò chuyện
  async getAllConversations(req: Request, res: Response) {
    const data = await conversationService.getAllConversations()
    return sendResponseSuccess(res, data)
  }

  // Lấy ra cuộc trò chuyện bằng user_id
  async getConversationByUserID(req: Request, res: Response) {
    const { user_id } = req.params

    const data = await conversationService.getConversationByUserID(user_id)

    sendResponseSuccess(res, data)
  }

  // Thêm mới cuộc trò chuyện
  async addNewConversation(req: Request, res: Response) {
    const dataParticipants: ConversationInput = req.body
    const data = await conversationService.addNewConversation(dataParticipants)
    sendResponseSuccess(res, data)
  }
}

export default new conversationController()
