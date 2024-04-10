import { NextFunction, Request, Response } from 'express'
import userService from '../services/userService'
import { sendResponseSuccess } from '../utils/response'
import { StatusCodes } from 'http-status-codes'
import { CustomErrorHandler } from '../utils/ErrorHandling'

class userController {
  // Lấy thông tin người dùng
  async getProfile(req: Request, res: Response) {
    if (req.user) {
      const { user_id } = req.user
      const data = await userService.getProfile(user_id)
      sendResponseSuccess(res, data)
    } else {
      throw new CustomErrorHandler(StatusCodes.NOT_FOUND, 'Không tồn tại người dùng!')
    }
  }

  // Lấy danh sách người dùng
  async getAllUsers(req: Request, res: Response) {
    const data = await userService.getAllUsers()
    sendResponseSuccess(res, data)
  }

  // Lấy người dùng bằng user_id
  async getUserByID(req: Request, res: Response) {
    const user_id: string = req.params.user_id
    const data = await userService.getUserByID(user_id)
    sendResponseSuccess(res, data)
  }
}

export default new userController()
