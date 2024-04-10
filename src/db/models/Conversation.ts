import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface ConversationAttributes {
  conversation_id: string
  participant_one: string
  participant_two: string
  createdAt: Date
  updatedAt: Date
}

interface ConversationCreationAttributes
  extends Optional<ConversationAttributes, 'conversation_id' | 'createdAt' | 'updatedAt'> {}

class Conversation
  extends Model<ConversationAttributes, ConversationCreationAttributes>
  implements ConversationAttributes
{
  declare conversation_id: string
  declare participant_one: string
  declare participant_two: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Conversation.init(
  {
    conversation_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    participant_one: {
      allowNull: true,
      type: DataTypes.STRING
    },
    participant_two: {
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
    modelName: 'Conversation',
    tableName: 'Conversations'
  }
)

export default Conversation
