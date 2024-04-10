import models from '../db/models'
import { StatusCodes } from 'http-status-codes'
import { ResponseSuccessData } from '../types/response.type'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class userService {
  // Lấy thông tin người dùng
  async getProfile(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Role, as: 'role_data', attributes: ['role_name', 'description'] }]
    })

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user
      }
    } as ResponseSuccessData
  }

  // Lấy danh sách người dùng
  async getAllUsers() {
    const users = await models.User.findAll({
      attributes: {
        exclude: ['password']
      }
    })

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        users
      }
    }
  }

  // Lấy người dùng bằng user_id
  async getUserByID(user_id: string) {
    const user = await models.User.findByPk(user_id, {
      attributes: {
        exclude: ['password']
      }
    })

    if (!user) {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Người dùng không tồn tại!')
    }

    return {
      message: 'Lấy thông tin người dùng thành công.',
      data: {
        user
      }
    }
  }
}

export default new userService()
