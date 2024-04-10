import { Op } from 'sequelize'
import models from '../db/models'
import { ConversationInput } from '../types/conversation.type'
import { ResponseSuccessData } from '../types/response.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'
import { StatusCodes } from 'http-status-codes'
import messageService from './messageService'

class conversationService {
  // Lấy tất cả các cuộc trò chuyện
  async getAllConversations() {
    const data = await models.Conversation.findAll({
      include: [
        { model: models.User, as: 'user_data_one', attributes: ['first_name', 'last_name'] },
        { model: models.User, as: 'user_data_two', attributes: ['first_name', 'last_name'] }
      ]
    })

    return {
      message: 'Thành công',
      data
    } as ResponseSuccessData
  }

  // Lấy tất cả cuộc trò chuyện dựa vào id người dùng
  async getConversationByUserID(user_id: string) {
    const userExists = await models.User.findByPk(user_id)

    if (!userExists) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    const listConversation = await models.Conversation.findAll({
      where: {
        [Op.or]: [{ participant_one: user_id }, { participant_two: user_id }]
      }
    })

    return {
      message: 'Thành công',
      data: listConversation
    } as ResponseSuccessData
  }

  // Thêm mới cuộc trò chuyện
  async addNewConversation(dataParticipants: ConversationInput) {
    const { participant_one, participant_two } = dataParticipants

    const conversation = await models.Conversation.findOne({
      where: {
        [Op.or]: [
          { participant_one, participant_two },
          { participant_one: participant_two, participant_two: participant_one }
        ]
      }
    })

    if (conversation) {
      const { conversation_id } = conversation
      return {
        message: 'Cuộc trò chuyện đã tồn tại!',
        data: {
          conversation_id
        }
      }
    }

    const newConversation = await models.Conversation.create(dataParticipants)

    return {
      message: 'Thành công!',
      data: newConversation
    }
  }
}

export default new conversationService()
