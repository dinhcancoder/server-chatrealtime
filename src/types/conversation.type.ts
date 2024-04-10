import { ConversationAttributes } from '../db/models/Conversation'

export interface Conversation extends ConversationAttributes {}

export type ConversationInput = Omit<Conversation, 'conversation_id' | 'createdAt' | 'updatedAt'>
