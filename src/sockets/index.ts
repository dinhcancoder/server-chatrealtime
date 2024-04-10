import { Socket } from 'socket.io'
import conversationService from '../services/conversationService'
import messageService from '../services/messageService'
import { MessageInput } from '../types/message.type'
import userService from '../services/userService'

declare global {
  var onlineUsers: Map<any, any>
}

global.onlineUsers = new Map()
let listUserIDOnline: string[] = []
let isLoggingOut = false

function updateListUserIDOnline() {
  listUserIDOnline = Array.from(onlineUsers.keys())
}

function useSocketEvents(socket: Socket) {
  const user_id = socket.handshake.query.user_id

  onlineUsers.set(user_id, socket)

  updateListUserIDOnline()
  socket.emit('list_user_online', listUserIDOnline)

  // Đăng nhập
  socket.on('user_login', async () => {
    isLoggingOut = false
    const resUser = await userService.getUserByID(user_id as string)
    const { last_name, first_name } = resUser.data.user
    const userSocket = onlineUsers.get(user_id)

    socket.broadcast.emit('list_user_online', listUserIDOnline)

    if (userSocket) {
      socket.broadcast.emit('activity_notification', { data: `${first_name} ${last_name} vừa mới hoạt động` })
    }
  })

  // Đăng xuất
  socket.on('user_logout', () => {
    isLoggingOut = true
    onlineUsers.delete(user_id)
    updateListUserIDOnline()
    socket.broadcast.emit('list_user_online', listUserIDOnline)
  })

  // Xử lý cuộc trò chuyện
  socket.on('add_conversation', async (data: { participant_one: string; participant_two: string }) => {
    const { participant_one, participant_two } = data

    const resConversation = (await conversationService.addNewConversation({ participant_one, participant_two })) as {
      message: string
      data: { conversation_id: string }
    }

    const conversation_id = resConversation.data.conversation_id
    const resMessage = await messageService.getMessagesByConversationID(conversation_id)

    socket.emit('conversation_id', conversation_id)
    socket.emit('list_message', resMessage.data)
  })

  // Xử lý tin nhắn
  socket.on('send_message', async (data: MessageInput) => {
    const { receiver_id, conversation_id } = data
    const receiverSocket = onlineUsers.get(receiver_id)

    await messageService.sendMessage(data)

    const resMessage = await messageService.getMessagesByConversationID(conversation_id)
    socket.emit('list_message', resMessage.data)

    if (receiverSocket) {
      console.log(`Người nhận đang online`)
      receiverSocket.emit('list_message', resMessage.data)
    } else {
      console.log(`Người nhận đang offline`)
    }
  })

  // Đang gõ văn bản
  socket.on('user_typing', async (data: { sender_id: string; receiver_id: string }) => {
    const { receiver_id, sender_id } = data
    const receiverSocket = onlineUsers.get(receiver_id)
    const resUser = await userService.getUserByID(sender_id)
    const { last_name, first_name } = resUser.data.user
    const content = `${first_name} ${last_name} đang gõ nội dung`

    if (receiverSocket) {
      receiverSocket.emit('someone_typing', { data: content })
    }
  })

  // Ngừng gõ văn bản
  socket.on('user-un-typing', (data: { sender_id: string; receiver_id: string }) => {
    const { receiver_id } = data

    const receiverSocket = onlineUsers.get(receiver_id)
    socket.emit('someone_typing', { data: '' })

    if (receiverSocket) {
      receiverSocket.emit('someone_typing', { data: '' })
    }
  })

  // Ngắt kết nối
  socket.on('disconnect', () => {
    if (isLoggingOut) {
      onlineUsers.delete(user_id)
      updateListUserIDOnline()
      socket.broadcast.emit('list_user_online', listUserIDOnline)
      console.log(`Người dùng đã ngắt kết nối!`)
    }
  })
}

export default useSocketEvents
