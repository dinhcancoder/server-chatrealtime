import User from './User'
import Role from './Role'
import Conversation from './Conversation'
import Message from './Message'
import Todo from './Todo'

const roleRelationships = () => {
  Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'user_data'
  })
}

const userRelationships = () => {
  User.belongsTo(Role, {
    targetKey: 'role_id',
    foreignKey: 'role_id',
    as: 'role_data'
  })

  User.hasMany(Todo, {
    foreignKey: 'user_id',
    as: 'todo_data'
  })
}

const conversationRelationships = () => {
  Conversation.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'participant_one',
    as: 'user_data_one'
  })

  Conversation.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'participant_two',
    as: 'user_data_two'
  })
}

const messageRelationships = () => {
  Message.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'sender_id',
    as: 'sender_data'
  })

  Message.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'receiver_id',
    as: 'receiver_data'
  })

  Message.belongsTo(Conversation, {
    targetKey: 'conversation_id',
    foreignKey: 'conversation_id',
    as: 'conversation_data'
  })
}

const todoRelationships = () => {
  Todo.belongsTo(User, {
    targetKey: 'user_id',
    foreignKey: 'user_id',
    as: 'user_data'
  })
}

export const setupModelRelationships = () => {
  roleRelationships()
  userRelationships()
  conversationRelationships()
  messageRelationships()
  todoRelationships()
}

const models = { Role, User, Conversation, Message, Todo }

export default models
