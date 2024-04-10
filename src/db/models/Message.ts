import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface MessageAttributes {
  message_id: string
  conversation_id: string
  sender_id: string
  receiver_id: string
  content: string
  createdAt: Date
  updatedAt: Date
}

interface MessageCreationAttributes extends Optional<MessageAttributes, 'message_id' | 'createdAt' | 'updatedAt'> {}

class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  declare message_id: string
  declare conversation_id: string
  declare sender_id: string
  declare receiver_id: string
  declare content: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Message.init(
  {
    message_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    conversation_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    sender_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    receiver_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    content: {
      allowNull: true,
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    sequelize: db,
    underscored: false,
    modelName: 'Message',
    tableName: 'Messages'
  }
)

export default Message
