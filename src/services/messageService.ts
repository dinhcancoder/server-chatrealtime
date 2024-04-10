import { MessageInput } from '../types/message.type'
import models from '../db/models'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { StatusCodes } from 'http-status-codes'
import { ResponseSuccessData } from '../types/response.type'
import conversationService from './conversationService'
import { Op } from 'sequelize'
import { Conversation } from '../types/conversation.type'

class messageService {
  // lấy tin nhắn trong cuộc trò chuyện
  async getMessagesByConversationID(conversation_id: string) {
    const conversationExists = await models.Conversation.findOne({
      where: {
        conversation_id
      }
    })

    if (!conversationExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Cuộc trò chuyện không tồn tại!')
    }

    const messages = await models.Message.findAll({
      where: {
        conversation_id
      },
      include: [
        { model: models.User, as: 'sender_data', attributes: ['user_id', 'first_name', 'last_name'] },

        { model: models.User, as: 'receiver_data', attributes: ['user_id', 'first_name', 'last_name'] }
      ],
      order: [['createdAt', 'ASC']]
    })

    return {
      message: 'Thành công',
      data: messages
    }
  }

  // Gửi tin nhắn
  async sendMessage(dataSendMessage: MessageInput) {
    const { conversation_id } = dataSendMessage

    const conversationExists = await models.Conversation.findOne({
      where: {
        conversation_id
      }
    })

    if (!conversationExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Cuộc trò chuyện không tồn tại!')
    }

    const newMessage = await models.Message.create(dataSendMessage)

    return {
      message: 'Thành công',
      data: newMessage
    }
  }

  // Lấy tin nhắn mới nhất
  async getLatestMessageByConversationID(sender_id: string, receiver_id: string) {
    const conversation = (await models.Conversation.findOne({
      where: {
        [Op.or]: [
          {
            [Op.and]: [{ participant_one: sender_id }, { participant_two: receiver_id }]
          },
          {
            [Op.and]: [{ participant_one: receiver_id }, { participant_two: sender_id }]
          }
        ]
      }
    })) as Conversation

    const conversation_id = conversation.conversation_id

    const messages = await this.getMessagesByConversationID(conversation_id)

    const lastMessage = messages.data.splice(-1)

    return {
      message: 'Tin nhắn cuối cùng',
      data: {
        lastMessage
      }
    }
  }
}

export default new messageService()
