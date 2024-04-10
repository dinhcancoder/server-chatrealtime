import { Request, Response } from 'express'
import { MessageInput } from '../types/message.type'
import messageService from '../services/messageService'
import { sendResponseSuccess } from '../utils/response'

class messageController {
  // Lấy tin nhắn bằng conversation_id
  async getMessagesByConversationID(req: Request, res: Response) {
    const { conversation_id } = req.params

    const data = await messageService.getMessagesByConversationID(conversation_id)

    sendResponseSuccess(res, data)
  }

  // Gửi tin nhắn
  async sendMessage(req: Request, res: Response) {
    const dataSendMessage: MessageInput = req.body

    const data = await messageService.sendMessage(dataSendMessage)

    sendResponseSuccess(res, data)
  }

  // Lấy tin nhắn cuối cùng
  async getLatestMessageByConversationID(req: Request, res: Response) {
    const { sender_id, receiver_id } = req.params

    const data = await messageService.getLatestMessageByConversationID(sender_id, receiver_id)

    sendResponseSuccess(res, data)
  }
}

export default new messageController()
