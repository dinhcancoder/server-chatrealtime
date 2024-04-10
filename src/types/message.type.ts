import { MessageAttributes } from '../db/models/Message'

interface Message extends MessageAttributes {}

export type MessageInput = Omit<Message, 'message_id' | 'createdAt' | 'updatedAt'>
