import db from '../../connection'
import { v4 as uuidv4 } from 'uuid'
import { DataTypes, Model, Optional } from 'sequelize'

export interface TodoAttributes {
  todo_id: string
  todo_name: string
  description: string
  completed: boolean
  user_id: string
  createdAt: Date
  updatedAt: Date
}

interface TodoCreationAttributes
  extends Optional<TodoAttributes, 'todo_id' | 'completed' | 'createdAt' | 'updatedAt'> {}

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
  declare todo_id: string
  declare todo_name: string
  declare description: string
  declare completed: boolean
  declare user_id: string
  declare readonly createdAt: Date
  declare readonly updatedAt: Date
}

Todo.init(
  {
    todo_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: () => uuidv4()
    },
    todo_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING
    },
    completed: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user_id: {
      allowNull: false,
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
    modelName: 'Todo',
    tableName: 'Todos'
  }
)

export default Todo
